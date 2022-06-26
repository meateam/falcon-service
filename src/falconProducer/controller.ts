import FalconProducerManager from './manager';

export default class FalconProducerController {
    static async sendMsg(call: any): Promise<void> {
        const { eventType, fileId } = call.request;
        await FalconProducerManager.sendMsg(fileId, eventType);
    }
}
