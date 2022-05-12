export class IVoucherRes {
  _id: string;
  name: string;
  description?: string;
  discountRate: number;
  totalDiscount: number;
  minPriceApply: number;
  type: string;
  quantity: number;
  expire: Date;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
