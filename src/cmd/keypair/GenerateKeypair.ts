import Keypair from '../../lib/Keypair'

const generateKeypair = (): void => {
  if (process.env.SERVER_PRIVATE_KEY) {
    const keypair = new Keypair(process.env.SERVER_PRIVATE_KEY)
    if (!keypair.isValid) {
      keypair.generateKeys()
      console.log(`Keypair created and saved in '${process.env.SERVER_PRIVATE_KEY}'`)
    } else {
      console.error(`Error: Private key '${process.env.SERVER_PRIVATE_KEY}' exists. Remove the file to generate a new keypair.`)
    }
  }
}

const GenerateKeypairCommand = {
  command: 'generate',
  aliases: ['gen', 'new'],
  describe: 'Generate a new keypair and save',
  builder: {},
  handler: generateKeypair,
}
export default GenerateKeypairCommand