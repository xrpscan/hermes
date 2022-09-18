import https from 'node:https'
import fetch from 'node-fetch'
import Table from 'cli-table3'
import chalk from 'chalk'
import Peer, { IPeer } from '../../models/Peer'
import PeerConnection from '../../models/PeerConnection'
import { SYSTEM_CONFIG_ENDPOINT } from '../../lib/Constants'

const addPeer = async (argv: any): Promise<void> => {
  if (argv.url) {
    let url = argv.url.includes('://') ? argv.url : `https://${argv.url}`
    url = url.endsWith(SYSTEM_CONFIG_ENDPOINT) ? url : `${url}${SYSTEM_CONFIG_ENDPOINT}`
    try {
      const agent = new https.Agent({ rejectUnauthorized: false })
      const res = await fetch(url, { agent: agent })
      if (res.ok) {
        const peer = await res.json()
        await printPeer(peer)
        await savePeer(peer)
      } else {
        console.error(`Status: ${res.status}: ${res.statusText}`)
      }
    } catch (error: any) {
      if (error.message) {
        console.error(`Error: ${url} - ${error.message} `)
      }
    }
  } else {
    console.error('Error: System config url is required')
  }
}

const printPeer = async (peer: IPeer): Promise<void> => {
  let table = new Table()
  table.push(
    { 'Node Id':  peer.node_id },
    { 'REST URL': peer.rest_url },
    { 'gRPC URL': peer.grpc_url },
    { 'Fingerprint': peer.fingerprint },
  )
  console.log(table.toString())
}

const savePeer = async (peer: IPeer): Promise<void> => {
  const connection = new PeerConnection(peer)
  const restOK = await connection.restOK()
  const grpcOK = await connection.grpcOK()
  console.log(`REST connection: ${restOK ? chalk.green('OK') : chalk.red('FAILED')}`)
  console.log(`gRPC connection: ${grpcOK ? chalk.green('OK') : chalk.red('FAILED')}`)
  if (restOK && grpcOK) {
    try {
      await Peer.create(peer)
      console.log(`Added node ${peer.node_id} to peer list`)
    } catch (error: any) {
      console.error(`Error: Failed to save node - ${error.message}`)
    }
  }
}

const AddPeerCommand = {
  command: 'add [url]',
  describe: 'Add a new peer from system config url',
  builder: {},
  handler: addPeer,
}
export default AddPeerCommand