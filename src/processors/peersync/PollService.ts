import * as grpc from "@grpc/grpc-js"
import logger from "../../logger"
import { IPeer } from '../../models/Peer'
import { IValidation } from '../../models/Validation'
import { ValidationsClient } from '../../protos/pb/validations_grpc_pb'
import {
  LedgerRangeRequest,
  ValidationResponse,
} from '../../protos/pb/validations_pb'
import PeerManager from "./PeerManager"
import LocalNode from '../../lib/LocalNode'
import ValidationMessage from '../ValidationMessage'

const LOGPREFIX = '[peersync]'

class PollService {
  private readonly _peer: IPeer
  private readonly _manager: PeerManager
  private _startTime: number
  private _totalDocs: number

  constructor(peer: IPeer, manager: PeerManager) {
    this._peer = peer
    this._manager = manager
    this._startTime = new Date().getTime()
    this._totalDocs = 0
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
    if (LocalNode.node_id) ledgerRangeRequest.setRequestingNode(LocalNode.node_id)
    if (LocalNode.host) ledgerRangeRequest.setRequestingHost(LocalNode.host)

    client.getValidationsByLedgerRange(ledgerRangeRequest)
    .on('data', async (validation: ValidationResponse) => {
      await this.save(validation)
      this._totalDocs++
    })
    .on('end', () => {
      delete this._manager.connections[this._peer.node_id]
      const timeTaken = new Date().getTime() - this._startTime
      logger.info(LOGPREFIX, `Peer ${this._peer.node_id} ${this._peer.grpc_url} sync complete (${this._totalDocs} validations in ${timeTaken/1000} sec)`)
    })
    .on('error', (error: any) => {
      delete this._manager.connections[this._peer.node_id]
      logger.error(LOGPREFIX, `${this._peer.node_id} ${this._peer.grpc_url} ${error}`)
    })
  }

  private async save(validation: ValidationResponse) {
    const doc = await this.deserialize(validation)
    try {
      const vm = new ValidationMessage(doc)
      await vm.create()
    } catch {
    }
  }

  // Internal: Deserialize Protobuf message to object
  private async deserialize(validation: ValidationResponse): Promise<IValidation> {
    return {
      cookie: validation.getCookie(),
      data: validation.getData(),
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