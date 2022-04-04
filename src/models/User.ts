import { Dynamoose } from '../interfaces/Dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { ModelType } from 'dynamoose/dist/General';

export class User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function(dynamoose: Dynamoose): ModelType<User> {
  const UserSchema = new dynamoose.Schema(
    {
      id: String,
      name: String,
      email: {
        type: String,
        hashKey: true,
      },
      password: String,
    },
    {
      timestamps: true,
    },
  );
  
  const UserModel = dynamoose.model<User>('User', UserSchema);
  return UserModel;
};