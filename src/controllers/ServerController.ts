import express, { Request, Response } from 'express'
import CertCache from '../lib/CertCache'
import ENV from '../lib/ENV'

const ServerController = express.Router()

// Service auto configuration can bootstrap a peer
// connection by providing
// - Node's ID
// - Certificate
// - REST/gRPC connection ports

ServerController.route('/config')
.get((req: Request, res: Response) => {
  const info: IServerInfo = {}
  if (process.env.SERVER_CERTIFICATE) {
    const cert = new CertCache(process.env.SERVER_CERTIFICATE)
    info.node_id = cert.node_id
    info.certificate = cert.certificateBase64
    info.fingerprint = cert.certificate?.fingerprint256
    info.rest_url = `${ENV.SERVER_HOSTNAME}:${ENV.SERVER_REST_PORT}`
    if (ENV.SERVER_GRPC_ENABLED) {
      info.grpc_url = `${ENV.SERVER_HOSTNAME}:${ENV.SERVER_GRPC_PORT}`
    }
  }
  return res.json(info)
})

export default ServerController