import Validation from '../models/Validation'
import xrplclient from '../services/xrpl'
import logger from '../logger'
import ENV from '../lib/ENV'

const LOGPREFIX = '[ingress]'

const ingress = async () => {
  xrplclient.on('connected', () => {
    xrplclient.request({
      command: 'subscribe',
      streams: ['validations'],
    })
    logger.info(LOGPREFIX, `Ingressing validation messages from ${ENV.RIPPLED_URL}`)
  })

  xrplclient.on('validationReceived', async (validation) => {
    try {
      await Validation.create(validation)
    } catch (error) {
      if (error instanceof Error) {
        logger.error(LOGPREFIX, `${error}`)
      }
    }
  })
}

export default ingress