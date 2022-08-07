import EventEmitter from "events"
import { IPeer } from "../../models/Peer"

class PeerManager extends EventEmitter {
  connections: string[] = []

  constructor() {
    super()
  }

  async poll(peer: IPeer) {
    if (this.connections.includes(peer.node_id)) {
      this.emit('error', new Error(`Connection to peer ${peer.node_id} exists`))
    } else {
      this.connections.push(peer.node_id)
      this.emit('poll', peer)
    }
  }
}

export default PeerManager