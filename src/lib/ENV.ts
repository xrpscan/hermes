import 'dotenv/config'

class ENV {
  public static get INGRESS_ENABLED(): boolean {
    return process.env.INGRESS_ENABLED === 'true' ? true : false
  }
  public static get SERVER_HOSTNAME(): string {
    return process.env.SERVER_HOSTNAME || 'localhost'
  }
  public static get SERVER_PRIVATE_KEY(): string {
    return process.env.SERVER_PRIVATE_KEY || 'config/private.pem'
  }
  public static get SERVER_CERTIFICATE(): string {
    return process.env.SERVER_CERTIFICATE || 'config/cert.pem'
  }
  public static get SERVER_REST_ENABLED(): boolean {
    return process.env.SERVER_REST_ENABLED === 'true' ? true : false
  }
  public static get SERVER_REST_PORT(): number {
    return process.env.SERVER_REST_PORT ? Number(process.env.SERVER_REST_PORT) : 3001
  }
  public static get SERVER_GRPC_ENABLED(): boolean {
    return process.env.SERVER_GRPC_ENABLED === 'true' ? true : false
  }
  public static get SERVER_GRPC_ADDRESS(): string {
    return process.env.SERVER_GRPC_ADDRESS || '127.0.0.1'
  }
  public static get SERVER_GRPC_PORT(): number {
    return process.env.SERVER_GRPC_PORT ? Number(process.env.SERVER_GRPC_PORT) : 3002
  }
  public static get EXPRESS_REQUEST_LOG(): string {
    return process.env.EXPRESS_REQUEST_LOG || 'log/express.log'
  }
  public static get EXPRESS_LOG_FORMAT(): string {
    return process.env.EXPRESS_LOG_FORMAT || ':remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  }
  public static get MONGODB_HOST(): string {
    return process.env.MONGODB_HOST || 'xrpscan.example.com'
  }
  public static get MONGODB_PORT(): number {
    return process.env.MONGODB_PORT ? Number(process.env.MONGODB_PORT) : 27017
  }
  public static get MONGODB_DATABASE(): string {
    return process.env.MONGODB_DATABASE || 'hermes_prod'
  }
  public static get RIPPLED_URL(): string {
    return process.env.RIPPLED_URL || 'wss://xrplcluster.com'
  }
  public static get PEER_SYNC_INTERVAL(): number {
    return process.env.PEER_SYNC_INTERVAL ? Number(process.env.PEER_SYNC_INTERVAL) : 3600
  }
  public static get PEER_PRIVATE(): boolean {
    return process.env.PEER_PRIVATE === 'true' ? true : false
  }
  public static get SERVER_CERTIFICATE_DAYS(): string {
    return process.env.SERVER_CERTIFICATE_DAYS || '3650'
  }
  public static get SERVER_CERTIFICATE_SUBJECT_C(): string {
    return process.env.SERVER_CERTIFICATE_SUBJECT_C || 'CH'
  }
  public static get SERVER_CERTIFICATE_SUBJECT_ST(): string {
    return process.env.SERVER_CERTIFICATE_SUBJECT_ST || 'Denial'
  }
  public static get SERVER_CERTIFICATE_SUBJECT_L(): string {
    return process.env.SERVER_CERTIFICATE_SUBJECT_L || 'Dislocated'
  }
  public static get SERVER_CERTIFICATE_SUBJECT_O(): string {
    return process.env.SERVER_CERTIFICATE_SUBJECT_O || 'Unorganized'
  }
  public static get SERVER_CERTIFICATE_SUBJECT_CN(): string {
    return process.env.SERVER_CERTIFICATE_SUBJECT_CN || 'localhost'
  }

}
export default ENV
