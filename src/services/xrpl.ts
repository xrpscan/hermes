import { Client } from 'xrpl'
import ENV from '../lib/ENV'
import logger from '../logger'

const LOGPREFIX = '[xrpl]'

const xrplclient = new Client(`${ENV.RIPPLED_URL}`)
xrplclient.connect()
.then(() => {
})
.catch((error) => {
  logger.error(LOGPREFIX, `Connection error: ${ENV.RIPPLED_URL}: ${error}`)
})

xrplclient.on('connected', () => {
  logger.info(LOGPREFIX, `Connected: ${ENV.RIPPLED_URL}`)
})
xrplclient.on('disconnected', () => {
  logger.info(LOGPREFIX, `Disconnected: ${ENV.RIPPLED_URL}`)
})
xrplclient.on('error', (code, message) => {
  logger.info(LOGPREFIX, `Connection error: ${ENV.RIPPLED_URL}: ${code} ${message}`)
})

export default xrplclient