/* eslint-disable no-promise-executor-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import * as mongoose from 'mongoose';
import { HealthCheckResponse } from 'grpc-ts-health-check';

import { Server } from '../server';
import { config } from '../config';
import { log, Severity } from './logger';
import { getCurrTraceId } from './wrapper';
import { sleep } from '.';

export default class MongoDB {
    private static connect = async (): Promise<{ success: boolean; error: Error | null }> => {
        await mongoose.connect(config.mongo.uri, async (err) => {
            return { success: false, error: err };
        });

        return { success: true, error: null };
    };

    /**
     * Attempts to connect to mongo connectionRetries times.
     * Waits reconnectTimeout ms bewteen attempts.
     * @param server - the server trying to connect.
     */
    private static startConnectionAttempts = async (server: Server): Promise<void> => {
        const retries = parseInt('5', 10);
        const timeout = parseInt('2000', 10);

        for (let i = 1; i <= retries; i++) {
            const connectionRes: { success: boolean; error: Error | null } = await MongoDB.connect();

            // if mongo connection attempt has failed
            if (!connectionRes.success) {
                log(
                    Severity.ERROR,
                    `connection retry (${i}/${retries}) ${connectionRes.error}`,
                    'connectDB',
                    getCurrTraceId(),
                    {
                        errMsg: connectionRes.error?.message,
                        stack: connectionRes.error?.stack,
                    },
                );

                server.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
                await sleep(timeout);
            } else {
                log(Severity.INFO, `connected to ${config.mongo.uri}`, 'connectDB');
                server.setHealthStatus(HealthCheckResponse.ServingStatus.SERVING);
                break;
            }
        }
    };

    public static connectMongo = async (server: Server) => {
        const db = mongoose.connection;
        db.on('connected', () => {
            log(Severity.INFO, `connected to ${config.mongo.uri}`, 'connectDB');
            server.setHealthStatus(HealthCheckResponse.ServingStatus.SERVING);
        });
        db.on('error', (err) => {
            log(Severity.ERROR, 'mongo connection error!', 'connectDB', getCurrTraceId(), err);
            server.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
        });
        db.on('disconnected', () => {
            log(Severity.ERROR, 'mongo disconnected', 'connectDB');
            server.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
        });

        log(Severity.INFO, 'trying to mongo server', 'connectDB');

        try {
            await MongoDB.startConnectionAttempts(server);
        } catch (err) {
            server.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
            log(Severity.ERROR, `did not connect to mongo: ${err}`, 'connectDB');
        }
    };
}
