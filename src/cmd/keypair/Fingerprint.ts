import CertCache from '../../lib/CertCache'

const getFingerprint = (): void => {
  if (process.env.SERVER_CERTIFICATE) {
    const cert = new CertCache(process.env.SERVER_CERTIFICATE)
    if (cert && cert.certificate) {
      console.log(`Certificate fingerprint: ${cert.certificate.fingerprint256}`)
    } else {
      console.error(`Error: Invalid certificate '${process.env.SERVER_CERTIFICATE}'`)
    }
  }
}

const FingerprintCommand = {
  command: 'fingerprint',
  aliases: ['fp'],
  describe: 'Print certificate fingerprint',
  builder: {},
  handler: getFingerprint,
}
export default FingerprintCommand