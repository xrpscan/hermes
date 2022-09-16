import Table from 'cli-table3'
import chalk from 'chalk'
import Peer, { IPeer } from '../../models/Peer'

const removePeer = async (argv: any): Promise<void> => {
  if (argv.node_id) {
    Peer.deleteOne({node_id: argv.node_id}, (error) => {
      if (error) {
        console.log(`${chalk.red('Error')}: ${error}`)
      } else {
        console.log(`Peer deleted: ${argv.node_id}`)
      }
    })
  }
  process.exit(1)
}

const RemovePeerCommand = {
  command: 'remove [node_id]',
  aliases: ['delete', 'rm'],
  describe: 'Remove peer',
  builder: {},
  handler: removePeer,
}
export default RemovePeerCommand