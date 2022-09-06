## Hermes: XRP Ledger Validation message service

Hermes is a layer 2 messaging network for storing and relaying XRPL validation messages. Hermes servers can be linked together to create a P2P network to spool validation messages emitted by rippled's `validationReceived` event. 

### What is Hermes?
Validation messages are ephemeral, therefore they must be saved as soon as they're emitted. If a service processing XRPL Validation messages needs to be momentarily offline (due to an outage, service restart or upgrade), it can fetch missing Validation messages from the Hermes network.

Hermes server offers data access via REST and gRPC endpoints. See examples below on how to access it.

### Requirements

1. Linux server with OpenSSL binaries.
2. Access to a MongoDB server. Remote OK, but local is faster.
3. Access to a rippled node.
4. Node.js runtime.
5. `pm2` process manager *(optional)*

### Installation

1. Hermes can run on Linux distributions. We've tested it on Fedora and CentOS. To serve client requests, Hermes uses ports 50588 (REST) and 50589 (gRPC). These configurable ports must be opened on the firewall.

2. Hermes can use existing private-key and TLS certificates. To generate a new TLS certificate via Hermes, ensure `openssl` is installed. To verify, run:

```
$ openssl version
OpenSSL 1.1.1k  FIPS 25 Mar 2021
```
3. MongoDB is used to persist validation messages. A remote MongoDB server may be used, although performance may vary. To set up a local MongoDB server, follow the [MongoDB installation manual](https://www.mongodb.com/docs/manual/installation/).

4. Validation messages are sourced from a rippled node. Depending on available resources, a remote or local rippled server may be used. To set up a local rippled server, follow the [rippled installation guide](https://xrpl.org/install-rippled.html).

5. Hermes is tested on Node.js 18.7. [Download Node.js](https://nodejs.org/en/) and set up `PATH`.

6. Download the Hermes server and create a configuration file.

```
$ git clone https://github.com/xrpscan/hermes.git
$ cd hermes
$ npm install
$ npm run build
$ cp .env.example .env
```

7. Review server configuration in `.env` file. Use a valid and resolvable value for `SERVER_HOSTNAME`. This value would be used to generate TLS certificates, and Peers would connect to this URL via the auto-config mechanism.

```
SERVER_HOSTNAME = 'hermes.example.com'
```

8. If a new TLS certificate is needed, run:

```
$ npm run keypair generate
```

9. Start Hermes server

```
$ npm start
> hermes@0.1.0 start
> node dist/index.js

[Hermes] info [REST] Secure service started on https://hermes.example.com:50588
[Hermes] info [gRPC] Secure service started on hermes.example.com:50589
[Hermes] info [xrpl] Connected: ws://localhost:6006
[Hermes] info [ingress] Ingressing validation messages from ws://localhost:6006
[Hermes] info [mongod] Connected: mongodb://localhost:27017/hermes_prod
```

10. *Optional* - Run with the pm2 process manager

Install pm2

```
# npm install -g pm2
```

Run the provided pm2 start script
```
$ ./bin/start.sh
```

### Upgrading (from source)

1. Hermes can be upgraded from source. To be on the safer side, please backup your SSL keys (default location is `config/private.pem`, `config/cert.pem`) and `.env` config file.

```
$ cd hermes
$ git fetch --all
$ git rebase origin/main
$ npm run build
```

2. If required, restore SSL keys and `.env` file.

3. Start upgraded Hermes server

```
$ npm start
```

### Creating a P2P network

Hermes servers can be linked together to create a layer 2 messaging network. To add `vms.test.xrpscan.com:50588` as a peer, run:

```
$ npm run peer add vms.test.xrpscan.com:50588
```

This will initiate a ping handshake and add the node as a trusted peer. Optionally, others can add your node's URL to establish 2-way messaging.

To view a list of trusted peers, run:

```
$ npm run peer ls
```

To remove a peer, run:

```
$ npm run peer remove <node_id>
```

### Production notes

These settings are recommended while running Hermes in production environment.

1. Use XFS filesystem

MongoDB strongly recommends using XFS filesystem for its data directory `storage.dbPath`. [Read more →](https://www.mongodb.com/docs/manual/administration/production-notes/#kernel-and-file-systems)

2. Disable Transparent Huge Pages

Database workloads often perform poorly with `transparent_hugepage` enabled, because they tend to have sparse rather than contiguous memory access patterns. When running MongoDB on Linux, `transparent_hugepage` should be disabled for best performance. [Read more →](https://www.mongodb.com/docs/manual/tutorial/transparent-huge-pages/)

3. Limit MongoDB memory usage

With default configuration, MongoDB will use upto 50% of host's memory. To accommodate additional services that need RAM, you may have to decrease WiredTiger internal cache size. [Read more →](https://www.mongodb.com/docs/manual/faq/diagnostics/#memory-diagnostics-for-the-wiredtiger-storage-engine)

```
storage:
  dbPath: /var/lib/mongodb
  ...
  wiredTiger:
    engineConfig:
      cacheSizeGB: 4
```

4. Using PM2 &amp; Auto start Hermes on boot

In production environment, running Hermes with `pm2` process manager is recommended. An example pm2 startup script is available at `bin/start.sh`. It is possible to auto start pm2 on system boot-up. After Hermes is up and running with pm2, run:

```
pm2 save
pm2 startup
```
And follow instructions printed by pm2. [Read more →](https://pm2.keymetrics.io/docs/usage/startup/)

### Architecture

![Hermes architecture](https://github.com/xrpscan/hermes/blob/main/assets/hermes-architecture.png?raw=true)

### Known issues

* [yarn peer [add|ls|remove] commands don't return shell #6](https://github.com/xrpscan/hermes/issues/6)
* [gRPC connection terminated due to JavaScript heap out of memory #8](https://github.com/xrpscan/hermes/issues/7)

### Also see

* [Consensus - xrpl.org](https://xrpl.org/consensus.html)
* [Validations Stream - xrpl.org](https://xrpl.org/subscribe.html#validations-stream)

### Reporting bugs

Please create a new issue in [Hermes issue tracker](https://github.com/xrpscan/hermes/issues/new)

### EOF