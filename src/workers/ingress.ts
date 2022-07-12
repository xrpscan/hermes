import Validation from '../models/Validation'
import { Client } from 'xrpl'

const ingress = async () => {
  const client = new Client(`${process.env.RIPPLED_URL}`)
  await client.connect()
  console.log(`[ingress] Ingressing validation messages`)

  client.request({
    command: 'subscribe',
    streams: ['validations'],
  })

  client.on('validationReceived', async (validation) => {
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