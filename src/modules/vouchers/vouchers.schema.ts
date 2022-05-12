import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type VoucherDocument = Voucher & Document;

@Schema({ timestamps: true })
export class Voucher {
  @Prop({ type: 'String', length: [4, 50], required: true })
  name: string;

  @Prop({ type: 'String' })
  description?: string;

  @Prop({ type: 'Number', required: true, min: 1, max: 100 })
  discountRate: number;

  @Prop({ type: 'Number', required: true })
  totalDiscount: number;

  @Prop({ type: 'Number' || null, required: true, default: null })
  minPriceApply: number | null;

  @Prop({
    type: 'String',
    required: true,
    enum: ['forOne', 'forMany', 'freeShip'],
  })
  type: string;

  @Prop({ type: 'Number', required: true })
  quantity: number;

  @Prop({ type: 'Date', required: true })
  expire: Date;

  @Prop({ type: mongoose.Types.ObjectId || null, required: false })
  userId?: mongoose.Types.ObjectId | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);
