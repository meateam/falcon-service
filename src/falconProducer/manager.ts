import RabbitMQ from '../utils/rabbitmq';
import { config } from '../config';
import { FalconEventType } from '../falconEvent/interface';
import FalconEventRepository from '../falconEvent/repository';

export default class FalconProducerManager {
    public static sendMsg = async (fileId: string, eventType: FalconEventType): Promise<void> => {
        try {
            if (eventType === FalconEventType.FILE_DELETE) {
                await RabbitMQ.send(config.rabbit.deleteQueue, { fileId });
            }
        } catch (error) {
            await FalconEventRepository.createFalconEvent({ fileId, eventType });
            throw error;
        }
    };
}
