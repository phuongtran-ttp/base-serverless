import { GraphQLServerLambda } from 'graphql-yoga';
import merge from 'lodash/merge';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import contextBuilder from './contextBuilder';

const rootTypeDefs = require('./types/rootTypeDefs.graphql');

const rootResolvers = {
  Query: {
    healthcheck: () => 'hello world',
  },
  Mutation: {
    healthcheck: () => 'hello world',
  },
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
};

const types = [
  require('./types/example.graphql'),
  require('./types/user.graphql'),
];

const resolvers = [
  require('./resolvers/example.resolvers'),
  require('./resolvers/user.resolvers'),
];

export const serverLambda = new GraphQLServerLambda({
  typeDefs: [
    rootTypeDefs,
    ...types,
    ...[].concat(...resolvers.map(resolver => resolver.typeDefs)),
  ].join(''),
  resolvers: merge(
    rootResolvers,
    ...resolvers.map(resolver => resolver.resolvers),
  ),
  context: contextBuilder,
  options: {
    endpoint: 'graphql',
  }
});
