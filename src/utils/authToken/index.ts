import jwt, { SignOptions } from 'jsonwebtoken';

type Payload = string | object | Buffer;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default class AuthTokenUtils {
  static issue(payload: Payload, options?: SignOptions): string {
    return jwt.sign(payload, JWT_SECRET_KEY, options);
  }

  static verify(token: string): Promise<any> {
    return new Promise(function(resolve, reject) {
      jwt.verify(token, JWT_SECRET_KEY, {}, function(
        err,
        tokenPayload = {}
      ) {
        if (err) {
          return reject(new Error('Invalid token.'));
        }
        resolve(tokenPayload);
      });
    });
  }
}