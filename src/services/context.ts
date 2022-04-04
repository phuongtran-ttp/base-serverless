import DataLoader from 'dataloader';
import { User } from "../models/User";

export interface Context {
  userId: string;
  userLoader: DataLoader<string, User>;
  callbackWaitsForEmptyEventLoop?: boolean;

  getUser(): Promise<User>;
}