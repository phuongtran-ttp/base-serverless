
module.exports = `
  type Query {
    healthcheck: String!
  }

  type Mutation {
    healthcheck: String!
  }

  scalar Date
  scalar Time
  scalar DateTime
  scalar JSON
  scalar Upload
`;
