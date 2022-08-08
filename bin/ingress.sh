#!/bin/bash
export NODE_ENV=production
pm2 start ./dist/cmd/ingress/index.js --name hermes-ingress --time
