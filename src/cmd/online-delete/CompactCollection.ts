import mongoose from 'mongoose'
import Validation from '../../models/Validation'
import { prettyBytes } from '../../lib/Helpers'

const compactCollection = async (): Promise<void> => {
  mongoose.connection.on('connected', async () => {
    const collection = Validation.collection.name
    const result = await mongoose.connection.db.command({
      compact: collection,
      comment: 'online-delete compact processor'
    })
    if (result.ok && result.bytesFreed) {
      console.log(`[online-delete] Compact ${collection} collection: ${prettyBytes(result.bytesFreed)} freed`)
    }
    await mongoose.disconnect()
  })
}

const CompactCollectionCommand = {
  command: 'compact',
  describe: 'Compact MongoDB collection',
  builder: {},
  handler: compactCollection,
}
export default CompactCollectionCommand