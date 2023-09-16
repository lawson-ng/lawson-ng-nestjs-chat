import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  _id: true,
  timestamps: true,
  toObject: {
    getters: true,
  },
  toJSON: {
    getters: true,
  },
})
export class User {
  @Prop({
    type: String,
  })
  userName: string;

  @Prop({
    type: String,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
