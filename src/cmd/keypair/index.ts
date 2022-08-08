import 'dotenv/config'
import yargs from 'yargs'
import GenerateKeypair from './GenerateKeypair'
import PublicKey from './PublicKey'
import Fingerprint from './Fingerprint'
import Certificate from './Certificate'

yargs
.command(GenerateKeypair)
.command(PublicKey)
.command(Certificate)
.command(Fingerprint)
.demandCommand(1, 'You must enter one of the supported commands')
.help()
.argv