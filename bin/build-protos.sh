#!/bin/sh
npx grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=grpc_js:./src/protos/pb \
  --js_out=import_style=commonjs:./src/protos/pb \
  --grpc_out=grpc_js:./src/protos/pb \
  -I ./src/protos \
  ./src/protos/*.proto

