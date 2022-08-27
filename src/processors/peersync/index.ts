import PeerManager from './PeerManager'
import PollService from './PollService'
import logger from '../../logger'
import Peer, { IPeer } from '../../models/Peer'
import xrplclient from '../../services/xrpl'
import ENV from '../../lib/ENV'

const LOGPREFIX = '[peersync]'

const pollAllPeers = async (peerManager: PeerManager): Promise<void> => {
  for await (const peer of Peer
    .find({
      enabled: true,
    })
    .lean()
    ) {
      if (peerManager.connections[peer.node_id]) {
        peerManager.emit('error', new Error(`Connection to peer ${peer.node_id} ${peer.grpc_url} exists`))
      } else {
        peerManager.connections[peer.node_id] = true
        await peerManager.poll(peer)
      }
    }
}

const peerSync = async () => {
  const peerManager = new PeerManager()

  peerManager.on('poll', async (peer: IPeer) => {
    const ledgerIndexMax = await xrplclient.getLedgerIndex()
    const ledgerIndexMin = ledgerIndexMax - ENV.PEERSYNC_FETCH_DEPTH
    logger.info(LOGPREFIX, `Polling ${peer.node_id} ${peer.grpc_url} [${ledgerIndexMin}..${ledgerIndexMax}]`)
    const pollService = new PollService(peer, peerManager)
    pollService.fetch(ledgerIndexMin, ledgerIndexMax)
  })

  peerManager.on('error', (error: any) => {
    logger.error(LOGPREFIX, `${error}`)
  })

  pollAllPeers(peerManager)
  setInterval(pollAllPeers, ENV.PEERSYNC_POLL_INTERVAL_MS, peerManager)
}

const connectPeers = () => {
  xrplclient.on('connected', async () => {
    await peerSync()
  })
}

export default connectPeers