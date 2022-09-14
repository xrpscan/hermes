import * as grpc from '@grpc/grpc-js'
import {
  LedgerRequest,
  LedgerRangeRequest,
  MasterKeyRequest,
  ValidationResponse
} from '../../protos/pb/validations_pb'
import Validation from "../../models/Validation"
import logger from '../../logger'

const LOGPREFIX = '[grpc]'

export const getValidationsByLedger = async ( call: grpc.ServerWritableStream<LedgerRequest, ValidationResponse> ) => {
  const request = call.request as LedgerRequest
  logger.info(LOGPREFIX, `Ledger request from ${request.getRequestingNode()} ${request.getRequestingHost()}: ${request.getLedgerIndex()}`)
  const cursor = Validation
  .find({ ledger_index: request.getLedgerIndex() })
  .lean()
  .cursor()

  cursor.on('data', async (doc) => {
    cursor.pause()
    call.write(serialize(doc), () => {
      cursor.resume()
    })
  })
  cursor.on('end', () => {
    call.end()
  })
  cursor.on('error', (error) => {
    call.end()
    logger.error(LOGPREFIX, `${error}`)
  })
}

export const getValidationsByLedgerRange = async ( call: grpc.ServerWritableStream<LedgerRangeRequest, ValidationResponse> ) => {
  const request = call.request as LedgerRangeRequest
  logger.info(LOGPREFIX, `LedgerRange request from ${request.getRequestingNode()} ${request.getRequestingHost()}: [${request.getLedgerIndexMin()}..${request.getLedgerIndexMax()}]`)
  const cursor = Validation
  .find({
    ledger_index: {
      $gte: request.getLedgerIndexMin(),
      $lte: request.getLedgerIndexMax()
    }
  })
  .lean()
  .cursor()

  cursor.on('data', async (doc) => {
    cursor.pause()
    call.write(serialize(doc), () => {
      cursor.resume()
    })
  })
  cursor.on('end', () => {
    call.end()
  })
  cursor.on('error', (error) => {
    call.end()
    logger.error(LOGPREFIX, `${error}`)
  })
}

export const getValidationsByMasterKey = async ( call: grpc.ServerWritableStream<MasterKeyRequest, ValidationResponse> ) => {
  const request = call.request as MasterKeyRequest
  logger.info(LOGPREFIX, `MasterKey request from ${request.getRequestingNode()} ${request.getRequestingHost()}: ${request.getMasterKey()}`)
  const cursor = Validation
  .find({ master_key: request.getMasterKey() })
  .lean()
  .cursor()

  cursor.on('data', async (doc) => {
    cursor.pause()
    call.write(serialize(doc), () => {
      cursor.resume()
    })
  })
  cursor.on('end', () => {
    call.end()
  })
  cursor.on('error', (error) => {
    call.end()
    logger.error(LOGPREFIX, `${error}`)
  })
}

// Internal: Serialize Mongoose object to Protobuf message
const serialize = (doc: any): ValidationResponse => {
  const validation = new ValidationResponse()
  validation.setCookie(doc.cookie)
  validation.setData(doc.data)
  validation.setType(doc.type)
  validation.setFlags(doc.flags)
  validation.setFull(doc.full)
  validation.setLedgerHash(doc.ledger_hash)
  validation.setLedgerIndex(doc.ledger_index)
  validation.setMasterKey(doc.master_key)
  validation.setSignature(doc.signature)
  validation.setSigningTime(doc.signing_time)
  validation.setValidatedHash(doc.validated_hash)
  validation.setValidationPublicKey(doc.validation_public_key)
  validation.setServerVersion(doc.server_version)
  validation.setBaseFee(doc.base_fee)
  validation.setLoadFee(doc.load_fee)
  validation.setReserveBase(doc.reserve_base)
  validation.setReserveInc(doc.reserve_inc)
  return validation
}