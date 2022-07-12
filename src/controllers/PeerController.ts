import express, { Request, Response } from 'express'
import Peer from '../models/Peer'
import ENV from '../lib/ENV'

const PeerController = express.Router()

// All peers
PeerController.route('/')
.get((req: Request, res: Response) => {
  if (ENV.PEER_PRIVATE) {
    return res.json([])
  } else {
    Peer
    .find({enabled: true})
    .select('-_id -__v -enabled')
    .exec((error, peers) => {
      if (error) {
        return res.status(500).json('Error')
      } else if (peers) {
        return res.json(peers)
      } else {
        return res.status(404).json('Not found')
      }
    })      
  }
})

export default PeerController