import '../loadEnv';
import config from '../../config';
import dynamoose from 'dynamoose';
import { logger } from '../logger';

export const configDynamoose = () => {
  if (config.global.configuredDynamoose) return;
  config.global.configuredDynamoose = true;

  dynamoose.model.defaults.set({
    create: true,
    update: true,
  });

  dynamoose.aws.sdk.config.update({
    accessKeyId: config.global.app.accessKeyId,
    secretAccessKey: config.global.app.secretAccessKey,
    region: config.global.app.region,
  });

  if (!config.global.isProd()) {
    dynamoose.aws.ddb.local(process.env.APP_LOCAL_DYNAMO_ENDPOINT);
  }

  logger.trace('-- config: dynamoose with success');
};

const init = () => {
  if (config.global.initialized) return;
  config.global.initialized = true;

  try {
    configDynamoose();
  } catch (error) {
    console.log(error);
  }
};

init();
