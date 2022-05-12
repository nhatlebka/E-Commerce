import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/base-repository';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './products.schema';

@Injectable()
export class ProductRepository extends BaseRepository<ProductDocument> {
  protected entityDocument: ProductDocument;

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}
