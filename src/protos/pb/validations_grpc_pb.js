// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var validations_pb = require('./validations_pb.js');

function serialize_validations_LedgerRangeRequest(arg) {
  if (!(arg instanceof validations_pb.LedgerRangeRequest)) {
    throw new Error('Expected argument of type validations.LedgerRangeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_validations_LedgerRangeRequest(buffer_arg) {
  return validations_pb.LedgerRangeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_validations_LedgerRequest(arg) {
  if (!(arg instanceof validations_pb.LedgerRequest)) {
    throw new Error('Expected argument of type validations.LedgerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_validations_LedgerRequest(buffer_arg) {
  return validations_pb.LedgerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_validations_MasterKeyRequest(arg) {
  if (!(arg instanceof validations_pb.MasterKeyRequest)) {
    throw new Error('Expected argument of type validations.MasterKeyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_validations_MasterKeyRequest(buffer_arg) {
  return validations_pb.MasterKeyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_validations_ValidationResponse(arg) {
  if (!(arg instanceof validations_pb.ValidationResponse)) {
    throw new Error('Expected argument of type validations.ValidationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_validations_ValidationResponse(buffer_arg) {
  return validations_pb.ValidationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ValidationsService = exports.ValidationsService = {
  getValidation: {
    path: '/validations.Validations/GetValidation',
    requestStream: false,
    responseStream: false,
    requestType: validations_pb.LedgerRequest,
    responseType: validations_pb.ValidationResponse,
    requestSerialize: serialize_validations_LedgerRequest,
    requestDeserialize: deserialize_validations_LedgerRequest,
    responseSerialize: serialize_validations_ValidationResponse,
    responseDeserialize: deserialize_validations_ValidationResponse,
  },
  getValidationsByLedger: {
    path: '/validations.Validations/GetValidationsByLedger',
    requestStream: false,
    responseStream: true,
    requestType: validations_pb.LedgerRequest,
    responseType: validations_pb.ValidationResponse,
    requestSerialize: serialize_validations_LedgerRequest,
    requestDeserialize: deserialize_validations_LedgerRequest,
    responseSerialize: serialize_validations_ValidationResponse,
    responseDeserialize: deserialize_validations_ValidationResponse,
  },
  getValidationsByLedgerRange: {
    path: '/validations.Validations/GetValidationsByLedgerRange',
    requestStream: false,
    responseStream: true,
    requestType: validations_pb.LedgerRangeRequest,
    responseType: validations_pb.ValidationResponse,
    requestSerialize: serialize_validations_LedgerRangeRequest,
    requestDeserialize: deserialize_validations_LedgerRangeRequest,
    responseSerialize: serialize_validations_ValidationResponse,
    responseDeserialize: deserialize_validations_ValidationResponse,
  },
  getValidationsByMasterKey: {
    path: '/validations.Validations/GetValidationsByMasterKey',
    requestStream: false,
    responseStream: true,
    requestType: validations_pb.MasterKeyRequest,
    responseType: validations_pb.ValidationResponse,
    requestSerialize: serialize_validations_MasterKeyRequest,
    requestDeserialize: deserialize_validations_MasterKeyRequest,
    responseSerialize: serialize_validations_ValidationResponse,
    responseDeserialize: deserialize_validations_ValidationResponse,
  },
};

exports.ValidationsClient = grpc.makeGenericClientConstructor(ValidationsService);
