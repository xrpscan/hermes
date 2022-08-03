import * as grpc from '@grpc/grpc-js'
import fs from 'node:fs'
import chalk from 'chalk'
import { ValidationsService } from '../../protos/pb/validations_grpc_pb'
import { PingService } from '../../protos/pb/ping_grpc_pb'
import { 
  getValidationsByLedger,
  getValidationsByLedgerRange,
  getValidationsByMasterKey
 } from './ValidationRequest'
 import { ping } from './PingRequest'
 import ENV from '../../lib/ENV'
 import logger from '../../logger'

export const startgRPCServer = () => {
  const server = new grpc.Server()
  server.addService(ValidationsService, { 
    getValidationsByLedger,
    getValidationsByLedgerRange,
    getValidationsByMasterKey
  })
  server.addService(PingService, { ping })
  const credentials = getServerCredentials()
  server.bindAsync(
    `${process.env.SERVER_GRPC_ADDRESS}:${process.env.SERVER_GRPC_PORT}`,
    credentials,
    (error, port) => {
      if (error) {
        logger.error('[gRPC]', error.message)
      } else {
        server.start()
        logger.info('[gRPC]', `${credentials._isSecure() ? chalk.green('Secure') : chalk.red('Insecure')} service started on ${ENV.SERVER_HOSTNAME}:${port}`)
      }
    })
}

const getServerCredentials = (): grpc.ServerCredentials => {
  if (
    process.env.SERVER_PRIVATE_KEY &&
    process.env.SERVER_CERTIFICATE &&
    fs.existsSync(process.env.SERVER_PRIVATE_KEY) &&
    fs.existsSync(process.env.SERVER_CERTIFICATE)
    ) {
    const private_key = fs.readFileSync(process.env.SERVER_PRIVATE_KEY)
    const cert_chain = fs.readFileSync(process.env.SERVER_CERTIFICATE)
    return grpc.ServerCredentials.createSsl(
      null,
      [{
        private_key: private_key,
        cert_chain: cert_chain
      }],
      )
  }
  return grpc.ServerCredentials.createInsecure()
}