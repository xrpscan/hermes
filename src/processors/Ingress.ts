import Validation from '../models/Validation'
import xrplclient from '../services/xrpl'

const ingress = async () => {
  xrplclient.on('connected', () => {
    xrplclient.request({
      command: 'subscribe',
      streams: ['validations'],
    })
  })

  xrplclient.on('validationReceived', async (validation) => {
    try {
      await Validation.create(validation)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  })
}

export default ingress