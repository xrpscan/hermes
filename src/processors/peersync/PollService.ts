import * as grpc from "@grpc/grpc-js"
import logger from "../../logger"
import { IPeer } from '../../models/Peer'
import Validation, { IValidation } from '../../models/Validation'
import { ValidationsClient } from '../../protos/pb/validations_grpc_pb'
import {
  LedgerRangeRequest,
  ValidationResponse,
} from '../../protos/pb/validations_pb'

const LOGPREFIX = '[peersync]'

class PollService {
  private _peer: IPeer

  constructor(peer: IPeer) {
    this._peer = peer
  }

  private credentials(): grpc.ChannelCredentials {
    const certificate = Buffer.from(this._peer.certificate, 'base64')
    return grpc.credentials.createSsl(certificate)
  }

  async fetch(ledgerIndexMin: number, ledgerIndexMax: number) {
    const client = new ValidationsClient(this._peer.grpc_url, this.credentials())
    const ledgerRangeRequest = new LedgerRangeRequest()
    ledgerRangeRequest.setLedgerIndexMin(ledgerIndexMin)
    ledgerRangeRequest.setLedgerIndexMax(ledgerIndexMax)

    client.getValidationsByLedgerRange(ledgerRangeRequest)
    .on('data', (validation: ValidationResponse) => {
      this.save(validation)
    })
    .on('end', () => {
    })
    .on('error', (error: any) => {
      logger.error(LOGPREFIX, `${this._peer.node_id} ${error}`)
    })
  }

  private async save(validation: ValidationResponse) {
    const doc = await this.deserialize(validation)
    try {
      await Validation.create(doc)
    } catch {
    }
  }

  // Internal: Deserialize Protobuf message to object
  private async deserialize(validation: ValidationResponse): Promise<IValidation> {
    return {
      cookie: validation.getCookie(),
      type: validation.getType(),
      flags: validation.getFlags(),
      full: validation.getFull(),
      ledger_hash: validation.getLedgerHash(),
      ledger_index: validation.getLedgerIndex(),
      master_key: validation.getMasterKey(),
      signature: validation.getSignature(),
      signing_time: validation.getSigningTime(),
      validated_hash: validation.getValidatedHash(),
      validation_public_key: validation.getValidationPublicKey(),
      server_version: validation.getServerVersion(),
      base_fee: validation.getBaseFee(),
      load_fee: validation.getLoadFee(),
      reserve_base: validation.getReserveBase(),
      reserve_inc: validation.getReserveInc(),
    }
  }
}

export default PollService