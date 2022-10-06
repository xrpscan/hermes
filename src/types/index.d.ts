interface IServerInfo {
  node_id?: string | void
  certificate?: string | void
  fingerprint?: string | void
  rest_url?: string
  grpc_url?: string
  version?: string
}