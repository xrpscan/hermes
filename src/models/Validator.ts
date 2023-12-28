import { Schema, model } from 'mongoose'

export interface IValidator {
  master_key: string;
  ephemeral_key: string;
  domain: string;
  server_version: string|undefined;
  manifest: string|undefined;
  seq: number;
  ledger_index: number;
}

const ValidatorSchema = new Schema<IValidator>({
  master_key: { type: String, required: true, index: { unique: true } },
  ephemeral_key: { type: String, required: true, index: true },
  domain: { type: String },
  server_version: { type: String },
  manifest: { type: String },
  seq: { type: Number },
  ledger_index: { type: Number },
})

export default model<IValidator>('Validator', ValidatorSchema)