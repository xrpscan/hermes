#!/bin/bash
export NODE_ENV=production
pm2 start ./dist/index.js --name hermes --time
