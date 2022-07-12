import * as grpc from '@grpc/grpc-js'
import {
  LedgerRequest,
  LedgerRangeRequest,
  MasterKeyRequest,
  ValidationResponse
} from '../../protos/pb/validations_pb'
import Validation from "../../models/Validation"

export const getValidationsByLedger = async ( call: grpc.ServerWritableStream<LedgerRequest, ValidationResponse> ) => {
  const request = call.request as LedgerRequest
  for await (const doc of Validation.find({ ledger_index: request.getLedgerIndex() })) {
    call.write(await serialize(doc))
  }
  call.end()
}

export const getValidationsByLedgerRange = async ( call: grpc.ServerWritableStream<LedgerRangeRequest, ValidationResponse> ) => {
  const request = call.request as LedgerRangeRequest
  for await (const doc of Validation
    .find({
      ledger_index: {
        $gte: request.getLedgerIndexMin(),
        $lte: request.getLedgerIndexMax()
      }})
    ) {
    call.write(await serialize(doc))
  }
  call.end()
}

export const getValidationsByMasterKey = async ( call: grpc.ServerWritableStream<MasterKeyRequest, ValidationResponse> ) => {
  const request = call.request as MasterKeyRequest
  for await (const doc of Validation.find({ master_key: request.getMasterKey() })) {
    call.write(await serialize(doc))
  }
  call.end()
}

// Internal: Serialize Mongoose object to Protobuf message
const serialize = async (doc: any): Promise<ValidationResponse> => {
  const validation = new ValidationResponse()
  validation.setCookie(doc.cookie)
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