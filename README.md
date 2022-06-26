# falcon-service

**Compiling Protobuf To Golang:**

-   `PATH="${PATH}:${GOPATH}" protoc -I proto/ proto/falcon.proto --go_out=plugins=grpc:./proto`

## Compiling proto prerequisite

### In order to compile the proto file make sure you have `grpc-tools`, `protoc` and `protoc-gen-go` installed globaly:

`./install_protoc.sh`

### In order to compile the proto file make sure you have `protobuf` and `protoc-gen-go`

[https://grpc.io/docs/protoc-installation/](url)

`go install github.com/golang/protobuf/protoc-gen-go@latest`
