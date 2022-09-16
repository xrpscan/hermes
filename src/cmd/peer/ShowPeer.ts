import Table from 'cli-table3'
import chalk from 'chalk'
import Peer, { IPeer } from '../../models/Peer'

const showPeer = async (argv: any): Promise<void> => {
  if (argv.node_id) {
    const peer = await Peer.findOne({node_id: argv.node_id}).lean()
    if (peer) {
      printPeer(peer)
    } else {
      console.error(`${chalk.red('Error:')} Peer not found: ${argv.node_id}`)
    }
  }
  process.exit(1)
}

const printPeer = async (peer: IPeer): Promise<void> => {
  let table = new Table()
  table.push(
    { 'node_id':  peer.node_id },
    { 'rest_url': peer.rest_url },
    { 'gpc_url': peer.grpc_url },
    { 'fingerprint': peer.fingerprint },
    { 'enabled': peer.enabled },
  )
  console.log(table.toString())
}

const ShowPeerCommand = {
  command: 'show [node_id]',
  describe: 'Show saved peer info',
  builder: {},
  handler: showPeer,
}
export default ShowPeerCommand