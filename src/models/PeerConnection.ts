import https from 'node:https'
import crypto from 'node:crypto'
import fetch from 'node-fetch'
import * as grpc from "@grpc/grpc-js"
import { PingClient } from '../protos/pb/ping_grpc_pb'
import { PingRequest, PongResponse } from "../protos/pb/ping_pb"
import { IPeer } from './Peer'
import LocalNode from '../lib/LocalNode'

import { SYSTEM_CONFIG_ENDPOINT } from '../lib/Constants'

class PeerConnection {
  private _rest_url: string
  private _grpc_url: string
  private _certificate: string
  private _fingerprint: string

  constructor(peer: IPeer) {
    this._rest_url = peer.rest_url
    this._grpc_url = peer.grpc_url
    this._certificate = Buffer.from(peer.certificate, 'base64').toString('ascii')
    this._fingerprint = peer.fingerprint
  }

  // Test if secure REST connection is OK
  async restOK(): Promise<boolean> {
    let url = this._rest_url.startsWith('https://') ? this._rest_url : `https://${this._rest_url}`
    url = url.endsWith(SYSTEM_CONFIG_ENDPOINT) ? url : `${url}${SYSTEM_CONFIG_ENDPOINT}`

    try {
      const agent = new https.Agent({ ca: [this._certificate] })
      const res = await fetch(url, { agent })
      if (res.ok) {
        const data = await res.json()
        return (data.fingerprint === this._fingerprint)
      } else {
        return false
      }
    } catch (error: any) {
      console.error(`Error: ${error?.message}`)
      return false
    }
  }

  // Test if secure gRPC connection is OK
  async grpcOK(): Promise<boolean> {
    const client = new PingClient(this._grpc_url, grpc.credentials.createSsl(Buffer.from(this._certificate)))
    const req = new PingRequest()
    const message = crypto.randomBytes(32).toString('hex')
    req.setMessage(message)
    if (LocalNode.node_id) req.setRequestingNode(LocalNode.node_id)
    if (LocalNode.host) req.setRequestingHost(LocalNode.host)

    try {
      return new Promise((resolve, reject) => client.ping(req, (error, res: PongResponse) => {
        const signature = res.getSignature()
        resolve(crypto.verify('SHA256', Buffer.from(message), this._certificate, Buffer.from(signature, 'hex')))
      }))
    } catch (error: any) {
      console.error(`Error: ${error?.message}`)
      return false
    }
  }

}

export default PeerConnection