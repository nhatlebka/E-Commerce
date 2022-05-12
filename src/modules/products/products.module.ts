import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BarCodeModule } from 'src/common/bar-code/bar-code.module';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module';
import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './products.repository';
import { Product, ProductSchema } from './products.schema';
import { ProductsService } from './products.service';
import { ValidateCategoryName } from './validate-relation/validate-category';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    BarCodeModule,
    CloudinaryModule,
    CategoryModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository, ValidateCategoryName],
})
export class ProductsModule {}
