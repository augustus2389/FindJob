import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type CVDocument = CV & Document;

@Schema()
export class CV {
  @Prop({ type: Object })
  profile: object;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Recruitment' })
  recruitment: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account' })
  writer: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account' })
  receiver: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  status: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;
}

export const CVSchema = SchemaFactory.createForClass(CV);
