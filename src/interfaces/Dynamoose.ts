import { Schema } from 'dynamoose/dist/Schema';
import { Document, AnyDocument } from 'dynamoose/dist/Document';
import { ModelType } from 'dynamoose/dist/General';

export interface Dynamoose {
  model: {  
    <T extends Document = AnyDocument>(name: string, schema?: any, options?: any): ModelType<T>;
    defaults: any;
  }
  Schema: typeof Schema
}