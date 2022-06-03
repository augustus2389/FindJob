import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ type: String, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  userName: string;

  @Prop({
    type: String,
    required: true,
    min: 6,
  })
  passWord: string;

  @Prop({
    type: String,
    required: true,
  })
  imgUrl: string;

  @Prop({
    type: String,
    enum: ['admin', 'candidate', 'recruiter'],
    required: true,
  })
  role: string;

  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  status: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
