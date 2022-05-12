import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: 'String', length: [4, 50], required: true })
  name: string;

  @Prop({ type: 'String', required: true })
  barcode: string;

  @Prop({ type: 'String', required: true })
  avatar: string;

  @Prop({ type: ['String'], required: true })
  image: string[];

  @Prop({ type: 'Number', required: true })
  price: number;

  @Prop({ type: 'Number', required: true })
  buyPrice: number;

  @Prop({ type: 'Number', required: true })
  weight: number;

  @Prop({ type: 'Number', required: true })
  quantity: number;

  @Prop({ type: 'String' })
  description?: string;

  @Prop({ type: 'String', required: true })
  category: string;

  @Prop({ type: 'Date' || null, default: null })
  deleteAt?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
