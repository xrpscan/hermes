import express, { Request, Response } from 'express'

const PingController = express.Router()

PingController.route('/')
.get((req: Request, res: Response) => {
  return res.json('pong')
})

export default PingController