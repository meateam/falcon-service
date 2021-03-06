// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.26.0
// 	protoc        v3.15.8
// source: falcon.proto

package falcon

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type EventType int32

const (
	// The msg that being sent.
	EventType_FILE_DELETE EventType = 0
)

// Enum value maps for EventType.
var (
	EventType_name = map[int32]string{
		0: "FILE_DELETE",
	}
	EventType_value = map[string]int32{
		"FILE_DELETE": 0,
	}
)

func (x EventType) Enum() *EventType {
	p := new(EventType)
	*p = x
	return p
}

func (x EventType) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (EventType) Descriptor() protoreflect.EnumDescriptor {
	return file_falcon_proto_enumTypes[0].Descriptor()
}

func (EventType) Type() protoreflect.EnumType {
	return &file_falcon_proto_enumTypes[0]
}

func (x EventType) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use EventType.Descriptor instead.
func (EventType) EnumDescriptor() ([]byte, []int) {
	return file_falcon_proto_rawDescGZIP(), []int{0}
}

type SendMsgRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// The msg that being sent.
	FileId    string    `protobuf:"bytes,1,opt,name=fileId,proto3" json:"fileId,omitempty"`
	EventType EventType `protobuf:"varint,2,opt,name=eventType,proto3,enum=falcon.EventType" json:"eventType,omitempty"`
}

func (x *SendMsgRequest) Reset() {
	*x = SendMsgRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_falcon_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SendMsgRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SendMsgRequest) ProtoMessage() {}

func (x *SendMsgRequest) ProtoReflect() protoreflect.Message {
	mi := &file_falcon_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SendMsgRequest.ProtoReflect.Descriptor instead.
func (*SendMsgRequest) Descriptor() ([]byte, []int) {
	return file_falcon_proto_rawDescGZIP(), []int{0}
}

func (x *SendMsgRequest) GetFileId() string {
	if x != nil {
		return x.FileId
	}
	return ""
}

func (x *SendMsgRequest) GetEventType() EventType {
	if x != nil {
		return x.EventType
	}
	return EventType_FILE_DELETE
}

type EmptyResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *EmptyResponse) Reset() {
	*x = EmptyResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_falcon_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *EmptyResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*EmptyResponse) ProtoMessage() {}

func (x *EmptyResponse) ProtoReflect() protoreflect.Message {
	mi := &file_falcon_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use EmptyResponse.ProtoReflect.Descriptor instead.
func (*EmptyResponse) Descriptor() ([]byte, []int) {
	return file_falcon_proto_rawDescGZIP(), []int{1}
}

var File_falcon_proto protoreflect.FileDescriptor

var file_falcon_proto_rawDesc = []byte{
	0x0a, 0x0c, 0x66, 0x61, 0x6c, 0x63, 0x6f, 0x6e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06,
	0x66, 0x61, 0x6c, 0x63, 0x6f, 0x6e, 0x22, 0x59, 0x0a, 0x0e, 0x53, 0x65, 0x6e, 0x64, 0x4d, 0x73,
	0x67, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x16, 0x0a, 0x06, 0x66, 0x69, 0x6c, 0x65,
	0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x66, 0x69, 0x6c, 0x65, 0x49, 0x64,
	0x12, 0x2f, 0x0a, 0x09, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x54, 0x79, 0x70, 0x65, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x0e, 0x32, 0x11, 0x2e, 0x66, 0x61, 0x6c, 0x63, 0x6f, 0x6e, 0x2e, 0x45, 0x76, 0x65,
	0x6e, 0x74, 0x54, 0x79, 0x70, 0x65, 0x52, 0x09, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x54, 0x79, 0x70,
	0x65, 0x22, 0x0f, 0x0a, 0x0d, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x2a, 0x1c, 0x0a, 0x09, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x54, 0x79, 0x70, 0x65, 0x12,
	0x0f, 0x0a, 0x0b, 0x46, 0x49, 0x4c, 0x45, 0x5f, 0x44, 0x45, 0x4c, 0x45, 0x54, 0x45, 0x10, 0x00,
	0x32, 0x4b, 0x0a, 0x0d, 0x46, 0x61, 0x6c, 0x63, 0x6f, 0x6e, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63,
	0x65, 0x12, 0x3a, 0x0a, 0x07, 0x53, 0x65, 0x6e, 0x64, 0x4d, 0x73, 0x67, 0x12, 0x16, 0x2e, 0x66,
	0x61, 0x6c, 0x63, 0x6f, 0x6e, 0x2e, 0x53, 0x65, 0x6e, 0x64, 0x4d, 0x73, 0x67, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x1a, 0x15, 0x2e, 0x66, 0x61, 0x6c, 0x63, 0x6f, 0x6e, 0x2e, 0x45, 0x6d,
	0x70, 0x74, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x42, 0x0a, 0x5a,
	0x08, 0x2e, 0x2f, 0x66, 0x61, 0x6c, 0x63, 0x6f, 0x6e, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x33,
}

var (
	file_falcon_proto_rawDescOnce sync.Once
	file_falcon_proto_rawDescData = file_falcon_proto_rawDesc
)

func file_falcon_proto_rawDescGZIP() []byte {
	file_falcon_proto_rawDescOnce.Do(func() {
		file_falcon_proto_rawDescData = protoimpl.X.CompressGZIP(file_falcon_proto_rawDescData)
	})
	return file_falcon_proto_rawDescData
}

var file_falcon_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_falcon_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_falcon_proto_goTypes = []interface{}{
	(EventType)(0),         // 0: falcon.EventType
	(*SendMsgRequest)(nil), // 1: falcon.SendMsgRequest
	(*EmptyResponse)(nil),  // 2: falcon.EmptyResponse
}
var file_falcon_proto_depIdxs = []int32{
	0, // 0: falcon.SendMsgRequest.eventType:type_name -> falcon.EventType
	1, // 1: falcon.FalconService.SendMsg:input_type -> falcon.SendMsgRequest
	2, // 2: falcon.FalconService.SendMsg:output_type -> falcon.EmptyResponse
	2, // [2:3] is the sub-list for method output_type
	1, // [1:2] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_falcon_proto_init() }
func file_falcon_proto_init() {
	if File_falcon_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_falcon_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SendMsgRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_falcon_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*EmptyResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_falcon_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_falcon_proto_goTypes,
		DependencyIndexes: file_falcon_proto_depIdxs,
		EnumInfos:         file_falcon_proto_enumTypes,
		MessageInfos:      file_falcon_proto_msgTypes,
	}.Build()
	File_falcon_proto = out.File
	file_falcon_proto_rawDesc = nil
	file_falcon_proto_goTypes = nil
	file_falcon_proto_depIdxs = nil
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// FalconServiceClient is the client API for FalconService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type FalconServiceClient interface {
	// SendMsg sends msg to queue
	SendMsg(ctx context.Context, in *SendMsgRequest, opts ...grpc.CallOption) (*EmptyResponse, error)
}

type falconServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewFalconServiceClient(cc grpc.ClientConnInterface) FalconServiceClient {
	return &falconServiceClient{cc}
}

func (c *falconServiceClient) SendMsg(ctx context.Context, in *SendMsgRequest, opts ...grpc.CallOption) (*EmptyResponse, error) {
	out := new(EmptyResponse)
	err := c.cc.Invoke(ctx, "/falcon.FalconService/SendMsg", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// FalconServiceServer is the server API for FalconService service.
type FalconServiceServer interface {
	// SendMsg sends msg to queue
	SendMsg(context.Context, *SendMsgRequest) (*EmptyResponse, error)
}

// UnimplementedFalconServiceServer can be embedded to have forward compatible implementations.
type UnimplementedFalconServiceServer struct {
}

func (*UnimplementedFalconServiceServer) SendMsg(context.Context, *SendMsgRequest) (*EmptyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SendMsg not implemented")
}

func RegisterFalconServiceServer(s *grpc.Server, srv FalconServiceServer) {
	s.RegisterService(&_FalconService_serviceDesc, srv)
}

func _FalconService_SendMsg_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SendMsgRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FalconServiceServer).SendMsg(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/falcon.FalconService/SendMsg",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FalconServiceServer).SendMsg(ctx, req.(*SendMsgRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _FalconService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "falcon.FalconService",
	HandlerType: (*FalconServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SendMsg",
			Handler:    _FalconService_SendMsg_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "falcon.proto",
}
