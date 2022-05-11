import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema({ timestamps: true })
export class Image {
  @Prop({ type: 'String', length: [4, 50], required: true })
  name: string;

  @Prop({ type: 'String', required: true })
  public_id: string;

  @Prop({ type: 'String', required: true, default: null })
  url: string;

  @Prop({ type: 'String', required: true, default: null })
  type: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
