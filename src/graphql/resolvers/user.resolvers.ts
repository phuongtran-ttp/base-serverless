import Database from '../../models';
import { nanoid } from 'nanoid';
import { omit } from 'lodash';
import bcrypt from 'bcryptjs';
import AuthTokenUtils from '../../utils/authToken';
import { BadRequestError, ERROR_CODES } from '../../errors';

const { UserModel: User } = Database;
const BCRYPT_ROUNDS = 10;

module.exports = {
  typeDefs: [
    `
    input SignUpByEmailInput {
      name: String!
      email: String!
      password: String!
    }

    extend type Query {
      GetMyProfile: User!
    }

    extend type Mutation {
      SignUpByEmail(input: SignUpByEmailInput!): SignUpByEmailResponse!
      SignInByEmail(email: String!, password: String!): SignInByEmailResponse!
    }
  `,
  ],
  resolvers: {
    Query: {
      GetMyProfile: async (root, args, context) => {
        if (!context.userEmail) {
          throw new BadRequestError(ERROR_CODES.unauthenticated);
        }

        const user = (
          await User.query('email')
            .eq(context.userEmail)
            .limit(1)
            .exec()
        ).toJSON()[0];

        if (user) {
          return omit(user, 'password');
        } else {
          throw new BadRequestError({
            code: 404,
            message: 'User not found',
          });
        }
      },
    },
    Mutation: {
      SignInByEmail: async (root, args, context) => {
        const { email, password } = args;
        const user = (
          await User.query('email')
            .eq(email)
            .limit(1)
            .exec()
        ).toJSON()[0];

        // if the email isn't found from User
        if (!user) {
          console.log('hello');
          throw new BadRequestError(ERROR_CODES.credentialsError);
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (passwordCheck) {
          return {
            user: omit(user, 'password'),
            token: AuthTokenUtils.issue({ email: user.email }),
          };
        } else {
          throw new BadRequestError(ERROR_CODES.credentialsError);
        }
      },
      SignUpByEmail: async (root, args, context) => {
        const { input: params } = args;
        const existingUser = (
          await User.query('email')
            .eq(params.email)
            .limit(1)
            .exec()
        ).toJSON()[0];

        console.log(existingUser);

        if (existingUser) {
          throw new BadRequestError({
            code: 400,
            message: 'Email is already registered',
          });
        }

        const newUser = await User.create({
          id: nanoid(),
          name: params.name,
          email: params.email,
          password: await bcrypt.hash(params.password, BCRYPT_ROUNDS),
        });

        newUser.createdAt = new Date(newUser.createdAt);
        newUser.updatedAt = new Date(newUser.updatedAt);

        return {
          user: omit(newUser, 'password'),
          token: AuthTokenUtils.issue({ email: newUser.email }),
        };
      },
    },
  },
};
