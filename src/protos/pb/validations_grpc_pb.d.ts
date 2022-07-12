// package: validations
// file: validations.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as validations_pb from "./validations_pb";

interface IValidationsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getValidation: IValidationsService_IGetValidation;
    getValidationsByLedger: IValidationsService_IGetValidationsByLedger;
    getValidationsByLedgerRange: IValidationsService_IGetValidationsByLedgerRange;
    getValidationsByMasterKey: IValidationsService_IGetValidationsByMasterKey;
}

interface IValidationsService_IGetValidation extends grpc.MethodDefinition<validations_pb.LedgerRequest, validations_pb.ValidationResponse> {
    path: "/validations.Validations/GetValidation";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<validations_pb.LedgerRequest>;
    requestDeserialize: grpc.deserialize<validations_pb.LedgerRequest>;
    responseSerialize: grpc.serialize<validations_pb.ValidationResponse>;
    responseDeserialize: grpc.deserialize<validations_pb.ValidationResponse>;
}
interface IValidationsService_IGetValidationsByLedger extends grpc.MethodDefinition<validations_pb.LedgerRequest, validations_pb.ValidationResponse> {
    path: "/validations.Validations/GetValidationsByLedger";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<validations_pb.LedgerRequest>;
    requestDeserialize: grpc.deserialize<validations_pb.LedgerRequest>;
    responseSerialize: grpc.serialize<validations_pb.ValidationResponse>;
    responseDeserialize: grpc.deserialize<validations_pb.ValidationResponse>;
}
interface IValidationsService_IGetValidationsByLedgerRange extends grpc.MethodDefinition<validations_pb.LedgerRangeRequest, validations_pb.ValidationResponse> {
    path: "/validations.Validations/GetValidationsByLedgerRange";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<validations_pb.LedgerRangeRequest>;
    requestDeserialize: grpc.deserialize<validations_pb.LedgerRangeRequest>;
    responseSerialize: grpc.serialize<validations_pb.ValidationResponse>;
    responseDeserialize: grpc.deserialize<validations_pb.ValidationResponse>;
}
interface IValidationsService_IGetValidationsByMasterKey extends grpc.MethodDefinition<validations_pb.MasterKeyRequest, validations_pb.ValidationResponse> {
    path: "/validations.Validations/GetValidationsByMasterKey";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<validations_pb.MasterKeyRequest>;
    requestDeserialize: grpc.deserialize<validations_pb.MasterKeyRequest>;
    responseSerialize: grpc.serialize<validations_pb.ValidationResponse>;
    responseDeserialize: grpc.deserialize<validations_pb.ValidationResponse>;
}

export const ValidationsService: IValidationsService;

export interface IValidationsServer extends grpc.UntypedServiceImplementation {
    getValidation: grpc.handleUnaryCall<validations_pb.LedgerRequest, validations_pb.ValidationResponse>;
    getValidationsByLedger: grpc.handleServerStreamingCall<validations_pb.LedgerRequest, validations_pb.ValidationResponse>;
    getValidationsByLedgerRange: grpc.handleServerStreamingCall<validations_pb.LedgerRangeRequest, validations_pb.ValidationResponse>;
    getValidationsByMasterKey: grpc.handleServerStreamingCall<validations_pb.MasterKeyRequest, validations_pb.ValidationResponse>;
}

export interface IValidationsClient {
    getValidation(request: validations_pb.LedgerRequest, callback: (error: grpc.ServiceError | null, response: validations_pb.ValidationResponse) => void): grpc.ClientUnaryCall;
    getValidation(request: validations_pb.LedgerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: validations_pb.ValidationResponse) => void): grpc.ClientUnaryCall;
    getValidation(request: validations_pb.LedgerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: validations_pb.ValidationResponse) => void): grpc.ClientUnaryCall;
    getValidationsByLedger(request: validations_pb.LedgerRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
    getValidationsByLedger(request: validations_pb.LedgerRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
    getValidationsByLedgerRange(request: validations_pb.LedgerRangeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
    getValidationsByLedgerRange(request: validations_pb.LedgerRangeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
    getValidationsByMasterKey(request: validations_pb.MasterKeyRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
    getValidationsByMasterKey(request: validations_pb.MasterKeyRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
}

export class ValidationsClient extends grpc.Client implements IValidationsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getValidation(request: validations_pb.LedgerRequest, callback: (error: grpc.ServiceError | null, response: validations_pb.ValidationResponse) => void): grpc.ClientUnaryCall;
    public getValidation(request: validations_pb.LedgerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: validations_pb.ValidationResponse) => void): grpc.ClientUnaryCall;
    public getValidation(request: validations_pb.LedgerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: validations_pb.ValidationResponse) => void): grpc.ClientUnaryCall;
    public getValidationsByLedger(request: validations_pb.LedgerRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
    public getValidationsByLedger(request: validations_pb.LedgerRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
    public getValidationsByLedgerRange(request: validations_pb.LedgerRangeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
    public getValidationsByLedgerRange(request: validations_pb.LedgerRangeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
    public getValidationsByMasterKey(request: validations_pb.MasterKeyRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
    public getValidationsByMasterKey(request: validations_pb.MasterKeyRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<validations_pb.ValidationResponse>;
}
