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
      await peerManager.poll(peer)
    }
}

const peerSync = async () => {
  const peerManager = new PeerManager()

  peerManager.on('poll', async (peer: IPeer) => {
    const ledgerIndexMax = await xrplclient.getLedgerIndex()
    const ledgerIndexMin = ledgerIndexMax - ENV.PEERSYNC_FETCH_DEPTH
    logger.info(LOGPREFIX, `Polling ${peer.node_id}: ${peer.grpc_url} [${ledgerIndexMin}..${ledgerIndexMax}]`)
    new PollService(peer).fetch(ledgerIndexMin, ledgerIndexMax)
  })

  peerManager.on('error', (error: any) => {
    logger.error(LOGPREFIX, `${error}`)
  })

  pollAllPeers(peerManager)
  setInterval(pollAllPeers, 30000, peerManager)
}

const connectPeers = () => {
  xrplclient.on('connected', async () => {
    await peerSync()
  })
}

export default connectPeers