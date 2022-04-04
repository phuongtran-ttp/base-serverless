import './utils/loadEnv';
import { serverLambda } from './graphql';

export const graphql = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  serverLambda.graphqlHandler(event, context, (...p) => {
    callback(...p);
  });
};

export const playground = serverLambda.playgroundHandler;