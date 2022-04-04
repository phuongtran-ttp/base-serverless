module.exports = `

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type SignUpByEmailResponse {
    user: User!,
    token: String!
  }

  type SignInByEmailResponse {
    user: User!,
    token: String!
  }
`;
