import crypto from 'node:crypto'
import fs from 'node:fs'
import { base58 } from './Base58'

const NODE_ID_PREFIX = 'h'

class CertCache {
  private _certificate: crypto.X509Certificate | void

  constructor(certificate_file: string) {
    if (fs.existsSync(certificate_file)) {
      try {
        const data = fs.readFileSync(certificate_file)
        this._certificate = new crypto.X509Certificate(data)
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: Cannot read certificate '${certificate_file}'  ${error.message}`)
        }
      }
    }
  }

  get certificate(): crypto.X509Certificate | void {
    return this._certificate
  }

  get certificatePEM(): string | void {
    return this._certificate?.toString()
  }

  get certificateBase64(): string | void {
    if (this.certificatePEM) {
      return Buffer.from(this.certificatePEM).toString('base64')
    }
  }

  get node_id(): string | void {
    if (this._certificate?.fingerprint256) {
      const fp = Buffer.from(this._certificate.fingerprint256.replace(/\:/g,''), 'hex')
      return `${NODE_ID_PREFIX}${base58.encode(fp)}`
    }
  }
}

export default CertCache
