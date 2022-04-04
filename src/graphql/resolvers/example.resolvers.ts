module.exports = {
  typeDefs: [
    `
    input ExampleInput {
      param1: ID!
      param2: String
      param3: Boolean
    }

    extend type Query {
      test(input: ExampleInput!): Example!
    }
    
    extend type Mutation {
      test(input: ExampleInput!): Example!
    }
  `,
  ],
  resolvers: {
    Query: {
      test: async (root, args, context) => {
        console.log(context);
        return {status: "OK"};
      },
    },
    Mutation: {
      test: async (root, args, context) => {
        return {status: "OK"};
      },
    },
  },
};
