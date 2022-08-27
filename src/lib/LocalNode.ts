import ENV from './ENV'
import CertCache from './CertCache'

class LocalNode {
  constructor() {

  }
  static get node_id(): string | void {
    if (ENV.SERVER_CERTIFICATE) {
      const cert = new CertCache(ENV.SERVER_CERTIFICATE)
      if (cert && cert.certificate) {
        return(cert.node_id)
      }
    }  
  }

  static get fingerprint(): string | void {
    if (ENV.SERVER_CERTIFICATE) {
      const cert = new CertCache(ENV.SERVER_CERTIFICATE)
      if (cert && cert.certificate) {
        return(cert.certificate.fingerprint256)
      }
    }  
  }

  static get host(): string | void {
    return ENV.SERVER_HOSTNAME
  }
}

export default LocalNode