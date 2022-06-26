import FalconProducerRepository from './falconProducer/repository';
import MongoDB from './utils/mongodb';
import { Server } from './server';
import { log, Severity } from './utils/logger';

(async () => {
    try {
        const server: Server = new Server();
        await Promise.all([MongoDB.connectMongo(server), FalconProducerRepository.initProducer()]);
    } catch (error: any) {
        log(Severity.ERROR, error, 'Server failed');
    }
})();
