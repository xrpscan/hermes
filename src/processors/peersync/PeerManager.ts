import EventEmitter from "events"
import { IPeer } from "../../models/Peer"

class PeerManager extends EventEmitter {
  connections: {[key: string]: boolean} = {}

  constructor() {
    super()
  }

  async poll(peer: IPeer) {
    this.emit('poll', peer)
  }
}

export default PeerManager