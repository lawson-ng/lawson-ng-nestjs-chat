import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/decorators/roles.decorator';

export type UserDocument = HydratedDocument<User>;

@Schema({
  _id: true,
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
  })
  userName: string;

  @Prop({ type: String, default: Role.User, enum: Role })
  role: string;

  @Prop({
    type: String,
  })
  password: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
