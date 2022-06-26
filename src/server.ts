import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import {
    GrpcHealthCheck,
    HealthCheckRequest,
    HealthCheckResponse,
    HealthClient,
    HealthService,
} from 'grpc-ts-health-check';

import FalconProducerController from './falconProducer/controller';
import { config } from './config';
import { log, Severity } from './utils/logger';
import { wrapper } from './utils/wrapper';

const apm = require('elastic-apm-node');

// apm.start({
//     serviceName: config.server.name,
//     secretToken: config.apm.secretToken,
//     verifyServerCert: config.apm.verifyServerCert,
//     serverUrl: config.apm.apmURL,
// });

export const serviceNames: string[] = ['', 'falcon.falconService'];
export const healthCheckStatusMap: any = {
    '': HealthCheckResponse.ServingStatus.UNKNOWN,
    [config.server.name]: HealthCheckResponse.ServingStatus.UNKNOWN,
};
const address: string = `${config.server.host}:${config.server.port}`;

export class Server {
    private falconProto: any;

    public server: grpc.Server;

    public grpcHealthCheck: GrpcHealthCheck;

    public requests: HealthCheckRequest[];

    public healthClient: HealthClient;

    public constructor() {
        // Create the server
        this.server = new grpc.Server();
        this.requests = [];

        // RegisterHealthService the health service
        this.grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);

        // Create the health client
        this.healthClient = new HealthClient(address, grpc.credentials.createInsecure());

        this.initiateProto();
        this.addServices();

        // Bind the server
        this.server.bind(address, grpc.ServerCredentials.createInsecure());
        this.server.start();
        log(Severity.INFO, `server listening on address: ${address}`, 'server bind');
    }

    private initiateProto() {
        const FALCON_PROTO_PATH: string = './proto/falcon/falcon.proto';

        // Suggested options for similarity to existing grpc.load behavior
        const falconPackageDefinition: protoLoader.PackageDefinition = protoLoader.loadSync(FALCON_PROTO_PATH, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        // Has the full package hierarchy
        const falconProtoDescriptor: grpc.GrpcObject = grpc.loadPackageDefinition(falconPackageDefinition);

        this.falconProto = falconProtoDescriptor.falcon;
    }

    private addServices() {
        // Add the health service
        this.server.addService(HealthService, this.grpcHealthCheck);

        // Set services
        Object.keys(healthCheckStatusMap).forEach((serviceName) => {
            const request = new HealthCheckRequest();
            request.setService(serviceName);
            this.requests.push(request);
        });

        const falconService = {
            SendMsg: wrapper(FalconProducerController.sendMsg),
        };

        this.server.addService(this.falconProto.FalconService.service, falconService);
    }

    setHealthStatus(status: HealthCheckResponse.ServingStatus): void {
        this.requests.forEach((request) => {
            const serviceName: string = request.getService();
            healthCheckStatusMap[serviceName] = status;
        });
    }
}
