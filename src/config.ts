import * as env from 'env-var';

const esHost = env.get('ELASTICSEARCH_URL').default('http://localhost:9200').asString();
const esUser = env.get('ELASTICSEARCH_USER').default('');
const esPass = env.get('ELASTICSEARCH_PASSWORD').default('');

export const config = {
    server: {
        name: 'falcon-service',
        host: env.get('FLCNS_HOST').default('0.0.0.0').asString(),
        port: env.get('FLCNS_PORT').default('8081').asString(),
        debugMode: env.get('FLCNS_DEBUG_MODE').default('false').asBool(),
    },
    rabbit: {
        url: env.get('FLCNS_RABBITMQ_URL').default('amqp://localhost').asString(),
        deleteQueue: env.get('FLCNS_RABBITMQ_DELETE_QUEUE').default('delete-images').asString(),
        healthCheckInterval: env.get('FLCNS_RABBITMQ_HEALTH_CHECK_INTERVAL').default('10000').asInt(),
        maxTimeout: env.get('FLCNS_RABBITMQ_MAX_TIMEOUT').default('60000').asInt(),
    },
    apm: {
        secretToken: env.get('APM_SECRET_TOKEN').default('').asString(),
        verifyServerCert: env.get('ELASTIC_APM_VERIFY_SERVER_CERT').default('false').asBool(),
        apmURL: env.get('ELASTIC_APM_SERVER_URL').default('http://localhost:8200').asUrlString(),
    },
    logger: {
        options: {
            hosts: esHost && esHost.split(','),
            httpAuth: `${esUser}:${esPass}`,
        },
        indexPrefix: process.env.LOG_INDEX || 'kdrive',
    },
    mongo: {
        uri: env.get('FLCNS_MONGO_URL').default('mongodb://localhost:27017/falcon').asString(),
        falconEventsCollection: env.get('FLCNS_MONGO_FALCON_EVENTS_COLLECTION').default('falconevents').asString(),
    },
};
