import yargs from 'yargs'
import ListPeers from './ListPeers'
import AddPeer from './AddPeer'
import ShowPeer from './ShowPeer'
import RemovePeer from './RemovePeer'

import { connectDatabase } from '../../db'
connectDatabase()

yargs
.command(ListPeers)
.command(AddPeer)
.command(ShowPeer)
.command(RemovePeer)
.demandCommand(1, 'You must enter one of the supported commands')
.help()
.argv