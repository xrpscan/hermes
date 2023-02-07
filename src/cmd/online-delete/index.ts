import yargs from 'yargs'
import CompactCollection from './CompactCollection'
import { connectDatabase } from '../../db'
connectDatabase()

yargs
.command(CompactCollection)
.demandCommand(1, 'You must enter one of the supported commands')
.help()
.argv