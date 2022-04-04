export default {
  initialized: false,
  configuredDynamoose: false,
  app: {
    realTime: {
      modelPrefix: 'real_time_',
    },
    accessKeyId: process.env.APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.APP_SECRET_ACCESS_KEY,
    region: process.env.APP_AWS_REGION,
  },
  isProd: () => process.env.NODE_ENV === 'production',
  isTest: () => process.env.NODE_ENV === 'test',
  isOffline: () => !!process.env.IS_OFFLINE,
}