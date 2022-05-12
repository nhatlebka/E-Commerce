import { HttpException, Injectable } from '@nestjs/common';
import { BarCodeService } from 'src/common/bar-code/bar-code.service';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { IRes } from '../auth/users.interface';
import {
  IProductCount,
  IProductCreate,
  IProductQuery,
  IProductRes,
  IProductUpdate,
} from './products.interface';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly barCodeService: BarCodeService,
    protected readonly cloudinaryService: CloudinaryService,
  ) {}

  async getProducts(query: IProductQuery): Promise<IProductRes[]> {
    const filterQuery = { ...query } as any;
    filterQuery.deleteAt = null;
    if (query.name) {
      filterQuery.name = { $regex: '.*' + query.name + '.*' };
    }
    if (query.category)
      filterQuery.category = { $regex: '.*' + query.category + '.*' };
    let sort = '';
    if (query.sort) {
      if (query.sortBy && query.sortBy === 'desc') {
        sort = '-' + query.sort;
      } else {
        sort = query.sort;
      }
    }
    delete filterQuery.sort;
    if (query.limit && query.page) {
      const { limit, page } = query;
      delete filterQuery.limit;
      delete filterQuery.page;
      return await this.productRepository.paginate(
        filterQuery,
        limit,
        page,
        sort,
      );
    }

    return this.productRepository.findAll(filterQuery, sort);
  }

  async getCount(query: IProductCount): Promise<number> {
    const filterQuery = { ...query } as any;
    filterQuery.deleteAt = null;
    if (query.name) filterQuery.name = { $regex: '.*' + query.name + '.*' };
    if (query.category)
      filterQuery.category = { $regex: '.*' + query.category + '.*' };
    return this.productRepository.getCount(filterQuery);
  }

  async getProductById(id: string): Promise<IProductRes> {
    return this.productRepository.findOne({ _id: id });
  }

  async creatProduct(data: IProductCreate): Promise<IProductRes> {
    const barcodeImg = await this.barCodeService.generateBarCode(data.barcode);
    const rs = await this.cloudinaryService.uploadBarcode(barcodeImg);
    const newData = { ...data, barcode: rs.url } as any;
    newData.discountRate = 0;
    return this.productRepository.create(newData);
  }

  async updateProduct(id: string, data: IProductUpdate): Promise<IProductRes> {
    return this.productRepository.update({ _id: id, deleteAt: null }, data);
  }

  async hardDeleteProduct(id: string): Promise<IRes> {
    const product = await this.productRepository.findOne({ _id: id });
    const publicId = product.barcode
      .split('/')
      [product.barcode.split('/').length - 1].split('.')[0];

    await this.cloudinaryService.deleteImage(publicId);

    return this.productRepository.delete({ _id: id });
  }

  async deleteProduct(id: string): Promise<IRes> {
    const product = await this.productRepository.update(
      { _id: id },
      { deleteAt: new Date() },
    );
    if (!product) {
      throw new HttpException('Cannot find product', 400);
    }

    return {
      status: 'success',
      message: 'Product deleted successfully',
    };
  }
}
