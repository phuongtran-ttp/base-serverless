// import DataLoader from 'dataloader';
import AuthTokenUtils from '../utils/authToken';
import { Context } from '../services/context';
// import { User } from "../models/User";
import { get } from 'lodash';

// const MODELS = {
//   [User.name]: { model: User, key: 'id' },
// };

// export class ContextImpl implements Context {
//   private dataLoaderMap = new Map();

//   userId: string;

//   constructor(ctx: any) {
//     Object.assign(this, ctx);
//   }

//   static async batchGetDataLoader(name: string, ids: string[]): Promise<any[]> {
//     // query from database
//     const { model, key }: any = MODELS[name];
//     const arrayT = await model.findAll({ where: { [key]: ids } });

//     // map result with original array
//     const mapOfT = new Map();
//     arrayT.forEach(t => {
//       mapOfT.set(t[key], t);
//     });

//     return ids.map(id => mapOfT.get(id));
//   }

//   /**
//    * @param n data loader name, it must be a pk of entity
//    */
//   private getLoader<T>(n): DataLoader<string, T> {
//     // return existing if has
//     if (this.dataLoaderMap.has(n)) return this.dataLoaderMap.get(n);

//     // create new one
//     const d = new DataLoader<string, T>(ids =>
//       ContextImpl.batchGetDataLoader(n, ids),
//     );

//     this.dataLoaderMap.set(n, d);
//     return d;
//   }

//   get userLoader(): DataLoader<string, User> {
//     return this.getLoader<User>(User.name);
//   }

//   getUser(): Promise<User> {
//     if (!this.userId) return null;
//     return this.userLoader.load(this.userId);
//   }
// }

const getHeader = (h = {}, n = ''): string => get(h, n, '').trim();

export default async (ctx): Promise<Context> => {
  try {
    const request = ctx['event'] || {};
    // const context: Context = new ContextImpl(ctx['context']);
    const authorization: string[] = getHeader(request.headers, "authorization") .split(' ');
    const authPrefix = authorization[0].toLowerCase();
  
    if (authPrefix === "bearer" && authorization[1]) {
      const { email } = await AuthTokenUtils.verify(authorization[1]);
      ctx.userEmail = email;
    }
    
    return ctx;
  } catch (error) {
    return ctx;
  }
};
