import mongoose from 'mongoose'
import chalk from 'chalk'
import Peer from '../../models/Peer'

const removePeer = async (argv: any): Promise<void> => {
  if (argv.node_id) {
    Peer.deleteOne({node_id: argv.node_id}, async (error) => {
      if (error) {
        console.log(`${chalk.red('Error')}: ${error}`)
        await mongoose.disconnect()
      } else {
        console.log(`Peer deleted: ${argv.node_id}`)
        await mongoose.disconnect()
      }
    })
  }
}

const RemovePeerCommand = {
  command: 'remove [node_id]',
  aliases: ['delete', 'rm'],
  describe: 'Remove peer',
  builder: {},
  handler: removePeer,
}
export default RemovePeerCommand