import * as grpc from '@grpc/grpc-js'
import crypto from 'node:crypto'
import { sendUnaryData } from '@grpc/grpc-js/build/src/server-call'
import { PingRequest, PongResponse } from '../../protos/pb/ping_pb'
import Keypair from '../../lib/Keypair'
import ENV from '../../lib/ENV'

export const ping = async ( call: grpc.ServerUnaryCall<PingRequest, PongResponse>, callback: sendUnaryData<PongResponse> ): Promise<void> => {
  const request = call.request as PingRequest
  const pong = new PongResponse()
  pong.setMessage(request.getMessage())
  try {
    const kp = new Keypair(ENV.SERVER_PRIVATE_KEY)
    if (kp.privateKey) {
      const signature = crypto.sign('SHA256', Buffer.from(request.getMessage()), kp.privateKey)
      pong.setSignature(signature.toString('hex'))
    }
  } catch {
  }
  callback(null, pong)
}
