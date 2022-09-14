/**
 * VerifyValidation.js
 * 
 * Based on XRPL Validation collector by Richard Holland
 * https://github.com/RichardAH/xrpl-validation-collector
 *
 * Verifies validation message signature.
**/
const elliptic = require('elliptic')
const secp256k1 = new elliptic.ec('secp256k1')
const ed25519 = new elliptic.eddsa('ed25519')
const crypto = require('node:crypto')

export const verify_validation = (public_key, val) =>
{
    if (typeof(val) == 'string')
        val = Buffer.from(val, 'hex')
    else if (typeof(val) == 'object' && val.data !== undefined)
        val = val.data

    const fail = (msg) =>
    {
      throw new Error(`Validation Parse Error: ${msg}`)
    }

    const parse_uint32 = (val, upto) =>
    {
        return  (BigInt(val[upto    ]) << 24n) +
                (BigInt(val[upto + 1]) << 16n) +
                (BigInt(val[upto + 2]) <<  8n) +
                (BigInt(val[upto + 3])) + ""
    }

    const parse_uint64 = (val, upto) =>
    {
        return  (BigInt(val[upto    ]) << 56n) +
                (BigInt(val[upto + 1]) << 48n) +
                (BigInt(val[upto + 2]) << 40n) +
                (BigInt(val[upto + 3]) << 32n) +
                (BigInt(val[upto + 4]) << 24n) +
                (BigInt(val[upto + 5]) << 16n) +
                (BigInt(val[upto + 6]) <<  8n) +
                (BigInt(val[upto + 7])) + ""
    }

    // remaining bytes
    const rem = ((len)=>
    {
        return (upto)=>{return len-upto}
    })(val.length)

    let upto = 0
    let json = {}

    // Flags
    if (val[upto++] != 0x22 || rem(upto) < 5)
        return fail('sfFlags missing or incomplete')
    json['Flags'] = parse_uint32(val, upto)
    upto += 4

    // LedgerSequence
    if (val[upto++] != 0x26 || rem(upto) < 5)
        return fail('sfLedgerSequnece missing or incomplete')
    json['LedgerSequence'] = parse_uint32(val, upto)
    upto += 4

    // CloseTime (optional)
    if (val[upto] == 0x27)
    {
        upto++
        if (rem(upto) < 4)
            return fail('sfCloseTime payload missing')
        json['CloseTime'] = parse_uint32(val, upto)
        upto += 4
    }

    // SigningTime
    if (val[upto++] != 0x29 || rem(upto) < 5)
        return fail('sfSigningTime missing or incomplete')
    json['SigningTime'] = parse_uint32(val, upto)
    upto += 4

    // LoadFee (optional)
    if (val[upto] == 0x20 && rem(upto) >= 1 && val[upto + 1] == 0x18)
    {
        upto += 2
        if (rem(upto) < 4)
            return fail('sfLoadFee payload missing')
        json['LoadFee'] = parse_uint32(val, upto)
        upto += 4
    }

    // ReserveBase (optional)
    if (val[upto] == 0x20 && rem(upto) >= 1 && val[upto + 1] == 0x1F)
    {
        upto += 2
        if (rem(upto) < 4)
            return fail('sfReserveBase payload missing')
        json['ReserveBase'] = parse_uint32(val, upto)
        upto += 4
    }

    // ReserveIncrement (optional)
    if (val[upto] == 0x20 && rem(upto) >= 1 && val[upto + 1] == 0x20)
    {
        upto += 2
        if (rem(upto) < 4)
            return fail('sfReserveIncrement payload missing')
        json['ReserveIncrement'] = parse_uint32(val, upto)
        upto += 4
    }

    // BaseFee (optional)
    if (val[upto] == 0x35)
    {
        upto++
        if (rem(upto) < 8)
            return fail('sfBaseFee payload missing')
        json['BaseFee'] = parse_uint64(val, upto)
        upto += 8
    }

    // Cookie (optional)
    if (val[upto] == 0x3A)
    {
        upto++
        if (rem(upto) < 8)
            return fail('sfCookie payload missing')
        json['Cookie'] = parse_uint64(val, upto)
        upto += 8
    }

    // ServerVersion (optional)
    if (val[upto] == 0x3B)
    {
        upto++
        if (rem(upto) < 8)
            return fail('sfServerVersion payload missing')
        json['ServerVersion'] = parse_uint64(val, upto)
        upto += 8
    }

    // LedgerHash
    if (val[upto++] != 0x51 || rem(upto) < 5)
        return fail('sfLedgerHash missing or incomplete')
    json['LedgerHash'] =
        val.slice(upto, upto + 32).toString('hex').toUpperCase()
    upto += 32

    // ConsensusHash
    if (val[upto] == 0x50 && rem(upto) >= 1 && val[upto + 1] == 0x17)
    {
        upto += 2
        if (rem(upto) < 32)
            return fail('sfConsensusHash payload missing')
        json['ConsensusHash'] =
            val.slice(upto, upto + 32).toString('hex').toUpperCase()
        upto += 32
    }

    // ValidatedHash
    if (val[upto] == 0x50 && rem(upto) >= 1 && val[upto + 1] == 0x19)
    {
        upto += 2
        if (rem(upto) < 32)
            return fail('sfValidatedHash payload missing')
        json['ValidatedHash'] =
            val.slice(upto, upto + 32).toString('hex').toUpperCase()
        upto += 32
    }

    // SigningPubKey
    if (val[upto++] != 0x73 || rem(upto) < 2)
        return fail('sfSigningPubKey missing')
    let key_size = val[upto++]
    if (rem(upto) < key_size)
        return fail('sfSigningPubKey payload missing')
    json['SigningPubKey'] =
        val.slice(upto, upto + key_size).toString('hex').toUpperCase()
    upto += key_size

    
    // Signature
    let sig_start = upto
    if (val[upto++] != 0x76 || rem(upto) < 2)
        return fail('sfSignature missing')
    let sig_size = val[upto++]
    if (rem(upto) < sig_size)
        return fail('sfSignature missing')
    json['Signature'] =
        val.slice(upto, upto + sig_size).toString('hex').toUpperCase()
    upto += sig_size
    let sig_end = upto

    // Amendments (optional)
    if (rem(upto) >= 1 && val[upto] == 0x03 && val[upto + 1] == 0x13)
    {
        upto += 2
        // parse variable length
        if (rem(upto) < 1)
            return fail('sfAmendments payload missing or incomplete [1]')
        let len = val[upto++]
        if (len <= 192)
        {
            // do nothing
        }
        else if (len >= 193 && len <= 240)
        {
            if (rem(upto) < 1)
                return fail('sfAmendments payload missing or incomplete [2]')
            len = 193 + ((len - 193) * 256) + val[upto++]
        }
        else if (len >= 241 && len <= 254)
        {
            if (rem(upto) < 2)
                return fail('sfAmendments payload missing or incomplete [2]')

            len = 
                12481 + ((len - 241) * 65536) + (val[upto + 1] * 256) + val[upto + 2]
            upto += 2
        }

        if (rem(upto) < len)
            return fail('sfAmendments payload missing or incomplete [3]')

        json['Amendments'] = []

        let end = upto + len
        while (upto < end)
        {
            json['Amendments'].push(val.slice(upto, upto + 32).toString('hex'))
            upto += 32
        }
    }

    // Check public key
    if (public_key.toUpperCase() != 
        json['SigningPubKey'].toString('hex').toUpperCase())
    {
        json['_verified'] = false
        json['_verification_error'] =
            'SigningPubKey did not match or was not present'
        return json
    }
    
    // Check signature
    const computed_hash =
        crypto.createHash('sha512').update(
            Buffer.concat(
                [   Buffer.from('VAL\x00', 'utf-8'),
                    val.slice(0, sig_start),
                    val.slice(sig_end, val.length)])
        ).digest().toString('hex').slice(0,64)
            

    const verify_key = 
        (public_key.slice(2) == 'ED' 
            ? ed25519.keyFromPublic(public_key.slice(2), 'hex')
            : secp256k1.keyFromPublic(public_key, 'hex'))

    if (!verify_key.verify(
        computed_hash, json['Signature']))
    {
        json['_verified'] = false
        json['_verification_error'] =
            'Signature (ed25519) did not match or was not present'
        return json
    }

    json['_verified'] = true
    return json

}