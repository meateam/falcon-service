/* eslint-disable import/extensions */
import * as winston from 'winston';
import * as os from 'os';
import * as WinstonElasticsearch from 'winston-elasticsearch';

import { config } from '../config';

// index pattern for the logger
const Elasticsearch = require('winston-elasticsearch');
const indexTemplateMapping = require('winston-elasticsearch/index-template-mapping.json');

indexTemplateMapping.index_patterns = `${process.env.LOG_INDEX || 'kdrive'}-*`;

// eslint-disable-next-line no-shadow
export enum Severity {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    VERBOSE = 'verbose',
    DEBUG = 'debug',
    SILLY = 'silly',
}

export const logger: winston.Logger = winston.createLogger({
    defaultMeta: { service: config.server.name, hostname: os.hostname() },
});

if (config.server.debugMode) {
    const consoleLogger = new winston.transports.Console();
    logger.add(consoleLogger);
}

const options: WinstonElasticsearch.ElasticsearchTransportOptions = {
    indexPrefix: config.logger.indexPrefix,
    level: 'error',
    clientOpts: config.logger.options,
    bufferLimit: 100,
    messageType: 'log',
    ensureMappingTemplate: true,
    mappingTemplate: indexTemplateMapping,
};
const elasticsearch = new Elasticsearch(options);
logger.add(elasticsearch);

export const log = (level: Severity, message: string, name: string, traceID?: string, meta?: object) => {
    logger.log(level, message, { ...meta, traceID, method: name });
};
