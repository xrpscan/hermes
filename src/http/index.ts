import 'dotenv/config'
import chalk from 'chalk'
import https from 'node:https'
import http from 'node:http'
import fs from 'node:fs'
import express, { Express, Request, Response, NextFunction } from 'express'
import ValidationController from '../controllers/ValidationController'
import PeerController from '../controllers/PeerController'
import ServerController from '../controllers/ServerController'
import PingController from '../controllers/PingController'
import ENV from '../lib/ENV'
import logger from '../logger'

export const startExpressServer = () => {
  const app: Express = express()

  // Enable CORS
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS')
    next()
  })

  // Routes
  app.use('/api/v1/validation', ValidationController)
  app.use('/api/v1/validations', ValidationController)
  app.use('/api/v1/peers', PeerController)
  app.use('/api/v1/server', ServerController)
  app.use('/api/v1/ping', PingController)
  app.use(express.static('public'))

  // Start https server if server certificate and private key is present.
  // Otherwise start http service
  if (fs.existsSync(ENV.SERVER_PRIVATE_KEY) && fs.existsSync(ENV.SERVER_CERTIFICATE)) {
    const options = {
      key: fs.readFileSync(ENV.SERVER_PRIVATE_KEY),
      cert: fs.readFileSync(ENV.SERVER_CERTIFICATE)
    }
    const tlsserver = https
    .createServer(options, app)
    .listen(ENV.SERVER_REST_PORT, () => {
      logger.info('[REST]', `${chalk.green('Secure')} service started on https://${ENV.SERVER_HOSTNAME}:${ENV.SERVER_REST_PORT}`)
    })
  } else {
    const httpserver = http
    .createServer({}, app)
    .listen(ENV.SERVER_REST_PORT, () => {
      logger.info('[REST]', `${chalk.red('Insecure')} service started on http://${ENV.SERVER_HOSTNAME}:${ENV.SERVER_REST_PORT}`)
    })
  }
}
