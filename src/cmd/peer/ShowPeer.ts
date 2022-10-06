import Table from 'cli-table3'
import chalk from 'chalk'
import Peer, { IPeer } from '../../models/Peer'
import mongoose from 'mongoose'

const showPeer = async (argv: any): Promise<void> => {
  if (argv.node_id) {
    const peer = await Peer.findOne({node_id: argv.node_id}).lean()
    if (peer) {
      await printPeer(peer)
      await mongoose.disconnect()
    } else {
      console.error(`${chalk.red('Error:')} Peer not found: ${argv.node_id}`)
      await mongoose.disconnect()
    }
  }
  else {
    console.error(`${chalk.red('Error:')} Peer's Node ID is required.`)
    await mongoose.disconnect()
  }
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