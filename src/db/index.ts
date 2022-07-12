import mongoose from 'mongoose'
import ENV from '../lib/ENV'

// Initialize db connection
export const connectDatabase = () => {
  const mongodbURI = `mongodb://${ENV.MONGODB_HOST}:${ENV.MONGODB_PORT}/${ENV.MONGODB_DATABASE}`
  const db = mongoose.connect(mongodbURI)
  .then((connection) => {
    console.log('[mongod]', 'Connected to mongodb: ', mongodbURI)
  })
  .catch((error) => {
    console.error('[mongod]', 'Error connecting to mongodb: ', error.message)
  })
}

export default connectDatabase