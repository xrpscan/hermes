import { Schema, model } from 'mongoose'

export interface IPeer {
  node_id: string
  rest_url: string
  grpc_url: string
  certificate: string
  fingerprint: string
  status: string
  enabled: boolean
}

const PeerSchema = new Schema<IPeer>({
  node_id: { type: String, required: true, index: { unique: true } },
  rest_url: { type: String },
  grpc_url: { type: String },
  certificate: { type: String, required: true },
  fingerprint: { type: String, required: true, index: { unique: true } },
  status: { type: String },
  enabled: { type: Boolean, default: true, index: true},
})

export default model<IPeer>('Peer', PeerSchema)