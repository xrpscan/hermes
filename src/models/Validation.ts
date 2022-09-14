import { Schema, model } from 'mongoose'

export interface IValidation {
  cookie: string;
  data: string;
  type: string;
  base_fee: number;
  load_fee: number;
  flags: number;
  full: boolean;
  ledger_hash: string;
  ledger_index: number;
  master_key: string;
  reserve_base: number;
  reserve_inc: number;
  server_version: string;
  signature: string;
  signing_time: number;
  validated_hash: string;
  validation_public_key: string;
}

const ValidationSchema = new Schema<IValidation>({
  cookie: { type: String },
  data: { type: String },
  type: { type: String, required: true },
  base_fee: { type: Number },
  load_fee: { type: Number },
  flags: { type: Number, required: true },
  full: { type: Boolean, required: true },
  ledger_hash: { type: String, required: true },
  ledger_index: { type: Number, required: true, index: true },
  master_key: { type: String, index: true },
  reserve_base: { type: Number },
  reserve_inc: { type: Number },
  server_version: { type: String },
  signature: { type: String, required: true },
  signing_time: { type: Number, required: true },
  validated_hash: { type: String },
  validation_public_key: { type: String, required: true, index: true },
})

ValidationSchema.index({ validation_public_key: 1, ledger_index: -1 }, { unique: true })

export default model<IValidation>('Validation', ValidationSchema)