import { decodeNodePublic } from 'ripple-address-codec'
import { verify_validation } from '../lib/VerifyValidation'
import Validation, { IValidation } from '../models/Validation'
import logger from '../logger'
import { MongoServerError } from 'mongodb'

const LOGPREFIX = '[validation-manager]'

class ValidationMessage {
  private _validation: IValidation
  private _signingPubKey: string

  constructor(validation: IValidation) {
    this._validation = validation
    this._signingPubKey = decodeNodePublic(validation.validation_public_key).toString('hex').toUpperCase()
  }

  async create(): Promise<boolean>  {
    if (this.verify()) {
      try {
        await Validation.create(this._validation)
        return true
      } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) {
          logger.verbose(LOGPREFIX, `${error}`)
        }
        else {
          logger.error(LOGPREFIX, `${error}`)
        }
        return false
      }
    }
    else {
      logger.verbose(LOGPREFIX, `Error: Signature verification failed for ${this._validation.validation_public_key}.${this._validation.ledger_index}`)
      return false
    }
  }

  verify(): boolean {
    if ( this._validation?.data && this._validation?.validation_public_key) {
      const result = verify_validation(this._signingPubKey, this._validation.data.toUpperCase())
      let _verified = result['_verified']

      // First check if the property keys are present in verified and unverified objects
      // If yes, then check if the property values are the same
      if (_verified && this._validation?.flags && result['Flags']) {
        _verified &&= String(this._validation?.flags) === result['Flags']
      }
      if (_verified && this._validation?.ledger_index && result['LedgerSequence']) {
        _verified &&= String(this._validation.ledger_index) === result['LedgerSequence']
      }
      if (_verified && this._validation?.signing_time && result['SigningTime']) {
        _verified &&= String(this._validation.signing_time) === result['SigningTime']
      }
      if (_verified && this._validation?.cookie && result['Cookie']) {
        _verified &&= this._validation?.cookie === result['Cookie']
      }
      if (_verified && this._validation?.ledger_hash && result['LedgerHash']) {
        _verified &&= this._validation.ledger_hash === result['LedgerHash']
      }
      if (_verified && this._validation?.validated_hash && result['ValidatedHash']) {
        _verified &&= this._validation?.validated_hash === result['ValidatedHash']
      }
      if (_verified && this._signingPubKey && result['SigningPubKey']) {
        _verified &&= this._signingPubKey === result['SigningPubKey']
      }
      if (_verified && this._validation?.signature && result['Signature']) {
        _verified &&= this._validation.signature === result['Signature']
      }
      return _verified
    } else {
      return false
    }
  }
}

export default ValidationMessage