import fs from 'node:fs'
import crypto from 'node:crypto'
import { spawnSync } from 'node:child_process'
import ENV from './ENV'

class Keypair {
  private _private_key_file: string
  private _private_key: crypto.KeyObject | void
  private _public_key: crypto.KeyObject | void

  constructor(private_key_file: string) {
    this._private_key_file = private_key_file
    if (fs.existsSync(private_key_file)) {
      const data = fs.readFileSync(private_key_file, 'utf8')
      try {
        this._private_key = crypto.createPrivateKey(data)
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: Unable to load private key from file '${private_key_file}' ` + error.message)
        }
      }
      try {
        this._public_key = crypto.createPublicKey(data)  
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: Unable to derive public key from file '${private_key_file}' ` + error.message)
        }
      }  
    } else {
      console.error(`Private key '${private_key_file}' is missing`)
    }
  }

  get privateKey(): crypto.KeyObject | void {
    return this._private_key
  }

  get publicKey(): crypto.KeyObject | void {
    return this._public_key
  }

  get privateKeyPEM(): string | Buffer | void  {
    if (this._private_key) {
      return this._private_key.export({ format: 'pem', type: 'pkcs8' })
    }
  }

  get publicKeyPEM(): string | Buffer | void {
    if (this._public_key) {
      return this._public_key.export({ format: 'pem', type: 'spki' })
    }
  }

  get fingerprint256(): string | void {
    if (this._public_key) {
      return crypto
      .createHash('sha256')
      .update(this._public_key.export({ format: 'der', type: 'spki' }))
      .digest('hex')
    }
  }

  get isValid(): boolean {
    return (this.privateKey && this.publicKey) ? true : false
  }

  generateKeys(): void {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
    })
    this._private_key = privateKey
    this._public_key = publicKey  
    this.savePrivateKey()
  }

  generateCert(): boolean {
    if (ENV.SERVER_PRIVATE_KEY && ENV.SERVER_CERTIFICATE) {
      const _days = ENV.SERVER_CERTIFICATE_DAYS || '3650'
      const _C = ENV.SERVER_CERTIFICATE_SUBJECT_C
      const _ST = ENV.SERVER_CERTIFICATE_SUBJECT_ST
      const _L = ENV.SERVER_CERTIFICATE_SUBJECT_L
      const _O = ENV.SERVER_CERTIFICATE_SUBJECT_O
      const _CN = ENV.SERVER_CERTIFICATE_SUBJECT_CN
      const cmd = spawnSync('openssl',[
        'req',
        '-key',
        ENV.SERVER_PRIVATE_KEY,
        '-new',
        '-x509',
        '-days',
        _days,
        '-out',
        ENV.SERVER_CERTIFICATE,
        '-subj',
        `/C=${_C}/ST=${_ST}/L=${_L}/O=${_O}/CN=${_CN}`,
      ])
      if (cmd.error) {
        console.error(`Error: Cannot generate certificate: ${cmd.error}` )
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }

  private savePrivateKey(): void {
    if (this.privateKeyPEM) {
      fs.writeFile(this._private_key_file, this.privateKeyPEM, { mode: 0o600 }, (error) => {
        if (error instanceof Error) {
          console.error(`Error: Unable to save private key '${this._private_key_file}' ${error.message}`)
        } else {
          this.generateCert()
        }
      })
    }
  }
}

export default Keypair