import menash from 'menashmq';

import { config } from '../config';
import { ServerError } from './errors/errors';
import { log, Severity } from './logger';

export default class RabbitMQ {
    public static init = async (): Promise<void> => {
        await RabbitMQ.initConnection();
        await RabbitMQ.initQueue();
    };

    private static initConnection = async (): Promise<void> => {
        try {
            log(Severity.INFO, 'Attempt connection to RabbitMQ', 'initRabbitmq');
            await menash.connect(config.rabbit.url, { maxTimeout: config.rabbit.maxTimeout });
            log(Severity.INFO, 'Connected to RabbitMQ', 'initRabbitmq');
        } catch (error: any) {
            log(Severity.ERROR, 'Could not connect to RabbitMQ', 'initRabbitmq');
            throw new ServerError(error);
        }
    };

    private static initQueue = async (): Promise<void> => {
        try {
            log(Severity.INFO, 'Attempt initQueue to in RabbitMQ', 'initQueue');
            await menash.declareQueue(config.rabbit.deleteQueue);
            log(Severity.INFO, 'initQueue RabbitMQ', 'initQueue');
        } catch (error: any) {
            log(Severity.ERROR, 'Could not initQueue in RabbitMQ', 'initQueue');
            throw new ServerError(error);
        }
    };

    public static send = async (queue: string, msg: any): Promise<void> => {
        await menash.send(queue, msg);
    };

    public static getRabbitHealthStatus = (): boolean => {
        return !menash.isClosed && menash.isReady;
    };

    public static ensureConnection = async (func?: Function): Promise<void> => {
        setInterval(async () => {
            try {
                if (!RabbitMQ.getRabbitHealthStatus()) {
                    await menash.close();
                    await RabbitMQ.init();
                    if (func) await func();
                }
            } catch (error: any) {
                log(Severity.ERROR, error, 'ensureConnectionToRabbitMQ');
            }
        }, config.rabbit.healthCheckInterval);
    };
}
