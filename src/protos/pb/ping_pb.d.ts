// package: ping
// file: ping.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class PingRequest extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): PingRequest;

    hasRequestingNode(): boolean;
    clearRequestingNode(): void;
    getRequestingNode(): string | undefined;
    setRequestingNode(value: string): PingRequest;

    hasRequestingHost(): boolean;
    clearRequestingHost(): void;
    getRequestingHost(): string | undefined;
    setRequestingHost(value: string): PingRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingRequest;
    static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
    export type AsObject = {
        message: string,
        requestingNode?: string,
        requestingHost?: string,
    }
}

export class PongResponse extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): PongResponse;
    getSignature(): string;
    setSignature(value: string): PongResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PongResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PongResponse): PongResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PongResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PongResponse;
    static deserializeBinaryFromReader(message: PongResponse, reader: jspb.BinaryReader): PongResponse;
}

export namespace PongResponse {
    export type AsObject = {
        message: string,
        signature: string,
    }
}
