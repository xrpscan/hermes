import Peer from '../../models/Peer'

const listPeer = async (): Promise<void> => {
  console.log('Peer list')
  Peer.find({}, '-_id -certificate -fingerprint', (error, peers) => {
    console.log(peers)
  })
}

const ListPeerCommand = {
  command: 'list',
  describe: 'List saved peers',
  builder: {},
  handler: listPeer,
}
export default ListPeerCommand