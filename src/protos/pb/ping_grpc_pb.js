// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var ping_pb = require('./ping_pb.js');

function serialize_ping_PingRequest(arg) {
  if (!(arg instanceof ping_pb.PingRequest)) {
    throw new Error('Expected argument of type ping.PingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ping_PingRequest(buffer_arg) {
  return ping_pb.PingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ping_PongResponse(arg) {
  if (!(arg instanceof ping_pb.PongResponse)) {
    throw new Error('Expected argument of type ping.PongResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ping_PongResponse(buffer_arg) {
  return ping_pb.PongResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PingService = exports.PingService = {
  ping: {
    path: '/ping.Ping/Ping',
    requestStream: false,
    responseStream: false,
    requestType: ping_pb.PingRequest,
    responseType: ping_pb.PongResponse,
    requestSerialize: serialize_ping_PingRequest,
    requestDeserialize: deserialize_ping_PingRequest,
    responseSerialize: serialize_ping_PongResponse,
    responseDeserialize: deserialize_ping_PongResponse,
  },
};

exports.PingClient = grpc.makeGenericClientConstructor(PingService);
