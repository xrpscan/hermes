import xrplclient from '../services/xrpl'
import logger from '../logger'
import ENV from '../lib/ENV'
import ValidationMessage from './ValidationMessage'

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
      // Ugly hack, because xrpl.ValidationStream does not have 'data' property.
      // https://github.com/XRPLF/xrpl.js/issues/2095
      const vm = new ValidationMessage( JSON.parse(JSON.stringify(validation)) )
      await vm.create()
    } catch (error) {
      logger.error(LOGPREFIX, `${error}`)
    }
  })
}

export default ingress