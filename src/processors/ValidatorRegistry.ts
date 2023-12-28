import xrplclient from '../services/xrpl'
import Validator, { IValidator } from '../models/Validator'
import { IValidation } from '../models/Validation'
import logger from '../logger'

const LOGPREFIX = '[validator-registry]'

class ValidatorRegistry {
  private _validation: IValidation

  constructor(validation: IValidation) {
    this._validation = validation
  }

  async refresh() {
    if (!this._validation.master_key) {
      logger.verbose(LOGPREFIX, `MasterKey missing: ${this._validation.validation_public_key}`)
      return
    }
    try {
      const manifest = await xrplclient.request({ command: "manifest", public_key: this._validation.master_key })
      if (manifest?.result?.details?.master_key === this._validation.master_key) {
        const newValidator: IValidator = {
          ledger_index: this._validation.ledger_index,
          server_version: this._validation.server_version,
          manifest: manifest.result.manifest,
          ...manifest.result.details,
        }
        Validator.findOneAndUpdate(
          { master_key: this._validation.master_key },
          newValidator,
          { upsert: true, new: true }
        )
        .then(validator => {
          logger.verbose(LOGPREFIX, `Updated validator: ${validator.master_key}`)
        })
      }
    } catch {
      logger.verbose(LOGPREFIX, `Error fetching manifest for ${this._validation.master_key}`)
    }
  }
}

export default ValidatorRegistry