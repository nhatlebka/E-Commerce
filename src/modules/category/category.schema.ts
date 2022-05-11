import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: 'String', length: [4, 50], required: true, unique: true })
  name: string;

  @Prop({ type: [String], required: true })
  banner: string[];

  @Prop({ type: 'String', required: false, default: null })
  description: string;

  @Prop({ type: 'Number', required: false, default: null })
  position: number;

  @Prop({ type: 'Boolean' })
  states: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
