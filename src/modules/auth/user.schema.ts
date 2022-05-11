import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RegexEmail } from 'src/constants/regex';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: 'String', length: [4, 50], required: true, unique: true })
  username: string;

  @Prop({ type: 'String', required: true })
  password: string;

  @Prop({
    type: 'String',
    required: true,
    unique: true,
    validate: RegexEmail,
    message: 'Email is invalid',
  })
  email: string;

  @Prop({ type: 'String', length: [4, 50], required: true })
  name: string;

  @Prop({ type: 'String', required: true })
  phone: string;

  @Prop({ type: 'String', required: true })
  address: string;

  @Prop({ type: 'String', required: true })
  emailToken: string;

  @Prop({ type: 'String' || null, required: true, default: null })
  rtToken: string | null;

  @Prop({ type: 'Boolean', required: true })
  isVerify: boolean;

  @Prop({
    type: 'String',
    required: true,
    enum: ['admin', 'root', 'staff', 'customer'],
  })
  role: string;

  @Prop({
    type: 'Boolean',
    required: true,
  })
  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
