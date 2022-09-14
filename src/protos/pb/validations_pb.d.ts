// package: validations
// file: validations.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class LedgerRequest extends jspb.Message { 
    getLedgerIndex(): number;
    setLedgerIndex(value: number): LedgerRequest;

    hasRequestingNode(): boolean;
    clearRequestingNode(): void;
    getRequestingNode(): string | undefined;
    setRequestingNode(value: string): LedgerRequest;

    hasRequestingHost(): boolean;
    clearRequestingHost(): void;
    getRequestingHost(): string | undefined;
    setRequestingHost(value: string): LedgerRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LedgerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LedgerRequest): LedgerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LedgerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LedgerRequest;
    static deserializeBinaryFromReader(message: LedgerRequest, reader: jspb.BinaryReader): LedgerRequest;
}

export namespace LedgerRequest {
    export type AsObject = {
        ledgerIndex: number,
        requestingNode?: string,
        requestingHost?: string,
    }
}

export class LedgerRangeRequest extends jspb.Message { 
    getLedgerIndexMin(): number;
    setLedgerIndexMin(value: number): LedgerRangeRequest;
    getLedgerIndexMax(): number;
    setLedgerIndexMax(value: number): LedgerRangeRequest;

    hasRequestingNode(): boolean;
    clearRequestingNode(): void;
    getRequestingNode(): string | undefined;
    setRequestingNode(value: string): LedgerRangeRequest;

    hasRequestingHost(): boolean;
    clearRequestingHost(): void;
    getRequestingHost(): string | undefined;
    setRequestingHost(value: string): LedgerRangeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LedgerRangeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LedgerRangeRequest): LedgerRangeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LedgerRangeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LedgerRangeRequest;
    static deserializeBinaryFromReader(message: LedgerRangeRequest, reader: jspb.BinaryReader): LedgerRangeRequest;
}

export namespace LedgerRangeRequest {
    export type AsObject = {
        ledgerIndexMin: number,
        ledgerIndexMax: number,
        requestingNode?: string,
        requestingHost?: string,
    }
}

export class MasterKeyRequest extends jspb.Message { 
    getMasterKey(): string;
    setMasterKey(value: string): MasterKeyRequest;

    hasRequestingNode(): boolean;
    clearRequestingNode(): void;
    getRequestingNode(): string | undefined;
    setRequestingNode(value: string): MasterKeyRequest;

    hasRequestingHost(): boolean;
    clearRequestingHost(): void;
    getRequestingHost(): string | undefined;
    setRequestingHost(value: string): MasterKeyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MasterKeyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: MasterKeyRequest): MasterKeyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MasterKeyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MasterKeyRequest;
    static deserializeBinaryFromReader(message: MasterKeyRequest, reader: jspb.BinaryReader): MasterKeyRequest;
}

export namespace MasterKeyRequest {
    export type AsObject = {
        masterKey: string,
        requestingNode?: string,
        requestingHost?: string,
    }
}

export class ValidationResponse extends jspb.Message { 
    getCookie(): string;
    setCookie(value: string): ValidationResponse;
    getType(): string;
    setType(value: string): ValidationResponse;
    getFlags(): number;
    setFlags(value: number): ValidationResponse;
    getFull(): boolean;
    setFull(value: boolean): ValidationResponse;
    getLedgerHash(): string;
    setLedgerHash(value: string): ValidationResponse;
    getLedgerIndex(): number;
    setLedgerIndex(value: number): ValidationResponse;
    getMasterKey(): string;
    setMasterKey(value: string): ValidationResponse;
    getSignature(): string;
    setSignature(value: string): ValidationResponse;
    getSigningTime(): number;
    setSigningTime(value: number): ValidationResponse;
    getValidatedHash(): string;
    setValidatedHash(value: string): ValidationResponse;
    getValidationPublicKey(): string;
    setValidationPublicKey(value: string): ValidationResponse;
    getData(): string;
    setData(value: string): ValidationResponse;
    getServerVersion(): string;
    setServerVersion(value: string): ValidationResponse;
    getBaseFee(): number;
    setBaseFee(value: number): ValidationResponse;
    getLoadFee(): number;
    setLoadFee(value: number): ValidationResponse;
    getReserveBase(): number;
    setReserveBase(value: number): ValidationResponse;
    getReserveInc(): number;
    setReserveInc(value: number): ValidationResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ValidationResponse): ValidationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidationResponse;
    static deserializeBinaryFromReader(message: ValidationResponse, reader: jspb.BinaryReader): ValidationResponse;
}

export namespace ValidationResponse {
    export type AsObject = {
        cookie: string,
        type: string,
        flags: number,
        full: boolean,
        ledgerHash: string,
        ledgerIndex: number,
        masterKey: string,
        signature: string,
        signingTime: number,
        validatedHash: string,
        validationPublicKey: string,
        data: string,
        serverVersion: string,
        baseFee: number,
        loadFee: number,
        reserveBase: number,
        reserveInc: number,
    }
}
