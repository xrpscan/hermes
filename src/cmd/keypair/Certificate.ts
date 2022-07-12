import CertCache from '../../lib/CertCache'

const getCertificate = (): void => {
  if (process.env.SERVER_CERTIFICATE) {
    const cert = new CertCache(process.env.SERVER_CERTIFICATE)
    if (cert && cert.certificate) {
      console.log(`Node ID: ${cert.node_id}`)
      console.log(`Fingerprint: ${cert.certificate.fingerprint256}`)
      console.log(cert.certificate.subject)
      console.log(`Valid from: ${cert.certificate.validFrom}`)
      console.log(`Valid till: ${cert.certificate.validTo}`)
    } else {
      console.error(`Error: Invalid certificate '${process.env.SERVER_CERTIFICATE}'`)
    }
  }
}

const CertificateCommand = {
  command: 'cert',
  aliases: ['certificate', 'x509'],
  describe: 'Print X.509 certificate',
  builder: {},
  handler: getCertificate,
}
export default CertificateCommand