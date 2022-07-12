import Keypair from '../../lib/Keypair'

const getPublicKey = (): void => {
  if (process.env.SERVER_PRIVATE_KEY) {
    const keypair = new Keypair(process.env.SERVER_PRIVATE_KEY)
    if (keypair.isValid) {
      console.log(keypair.publicKeyPEM)
    } else {
      console.error(`Error: Private key '${process.env.SERVER_PRIVATE_KEY}' is invalid`)
    }
  }
}

const PublicKeyCommand = {
  command: 'public',
  aliases: ['pub', 'pubkey'],
  describe: 'Print public key',
  builder: {},
  handler: getPublicKey,
}
export default PublicKeyCommand