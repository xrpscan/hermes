// package: ping
// file: ping.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as ping_pb from "./ping_pb";

interface IPingService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    ping: IPingService_IPing;
}

interface IPingService_IPing extends grpc.MethodDefinition<ping_pb.PingRequest, ping_pb.PongResponse> {
    path: "/ping.Ping/Ping";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<ping_pb.PingRequest>;
    requestDeserialize: grpc.deserialize<ping_pb.PingRequest>;
    responseSerialize: grpc.serialize<ping_pb.PongResponse>;
    responseDeserialize: grpc.deserialize<ping_pb.PongResponse>;
}

export const PingService: IPingService;

export interface IPingServer extends grpc.UntypedServiceImplementation {
    ping: grpc.handleUnaryCall<ping_pb.PingRequest, ping_pb.PongResponse>;
}

export interface IPingClient {
    ping(request: ping_pb.PingRequest, callback: (error: grpc.ServiceError | null, response: ping_pb.PongResponse) => void): grpc.ClientUnaryCall;
    ping(request: ping_pb.PingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ping_pb.PongResponse) => void): grpc.ClientUnaryCall;
    ping(request: ping_pb.PingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ping_pb.PongResponse) => void): grpc.ClientUnaryCall;
}

export class PingClient extends grpc.Client implements IPingClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public ping(request: ping_pb.PingRequest, callback: (error: grpc.ServiceError | null, response: ping_pb.PongResponse) => void): grpc.ClientUnaryCall;
    public ping(request: ping_pb.PingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ping_pb.PongResponse) => void): grpc.ClientUnaryCall;
    public ping(request: ping_pb.PingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ping_pb.PongResponse) => void): grpc.ClientUnaryCall;
}
