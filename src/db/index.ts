import mongoose from 'mongoose'
import ENV from '../lib/ENV'
import logger from '../logger'

// Initialize db connection
export const connectDatabase = () => {
  const mongodbURI = `mongodb://${ENV.MONGODB_HOST}:${ENV.MONGODB_PORT}/${ENV.MONGODB_DATABASE}`
  const db = mongoose.connect(mongodbURI)
  .then((connection) => {
    logger.info('[mongod]', 'Connected: %s', mongodbURI)
  })
  .catch((error) => {
    logger.error('[mongod]', 'Error connecting to : ', error.message)
  })
}

export default connectDatabase