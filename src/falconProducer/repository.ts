import RabbitMQ from '../utils/rabbitmq';
import FalconProducerManager from './manager';
import FalconEventRepository from '../falconEvent/repository';
import { log, Severity } from '../utils/logger';

export default class FalconProducerRepository {
    public static initProducer = async (): Promise<void> => {
        await RabbitMQ.init();
        await FalconProducerRepository.sendFailedFalconEvents();

        RabbitMQ.ensureConnection(FalconProducerRepository.sendFailedFalconEvents);
    };

    public static sendFailedFalconEvents = async (): Promise<void> => {
        const falconEvents = await FalconEventRepository.getAllFalconEvents();
        falconEvents.forEach(async (falconEvent) => {
            try {
                await FalconProducerManager.sendMsg(falconEvent.fileId, falconEvent.eventType);
                await FalconEventRepository.deleteFalconEvent(falconEvent.fileId);
            } catch (error) {
                log(Severity.ERROR, error, 'FalconEvent failed');
            }
        });
    };
}
