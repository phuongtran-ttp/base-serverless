

import '../utils/loadEnv';
import config from '../config';
import dynamoose from 'dynamoose';
import { logger } from '../utils/logger';
import { ModelType } from 'dynamoose/dist/General';
import initUserModel, { User } from './User';

function configDynamoose(): void {
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


function init(): void {
  if (config.global.initialized) return;
  config.global.initialized = true;

  try {
    configDynamoose();
  } catch (error) {
    console.log(error);
  }
};

class Database {
  private static instance: Database;
  public UserModel: ModelType<User>; 

  private constructor() {
    init();
    this.UserModel = initUserModel(dynamoose);
   }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

export default Database.getInstance();