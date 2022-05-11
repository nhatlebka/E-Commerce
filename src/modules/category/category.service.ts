import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { IRes } from '../auth/users.interface';
import {
  ICategoryCreateUpdate,
  ICategoryDetail,
  ICategoryQuery,
  ICategoryRes,
} from './category.interface';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategory(query: ICategoryQuery): Promise<ICategoryRes[]> {
    const filterQuery = { ...query } as any;
    if (query.name) {
      filterQuery.name = { $regex: '.*' + query.name + '.*' };
    }

    return this.categoryRepository.findAll(filterQuery);
  }

  async getCategoryDetail(id: string): Promise<ICategoryDetail> {
    const _id = new mongoose.Types.ObjectId(id);

    const rs = await this.categoryRepository.findWithRelation(
      'products',
      'name',
      'category',
      'products',
      { _id },
    );

    if (rs.length === 0) return null;
    return rs[0];
  }

  async createCategory(data: ICategoryCreateUpdate): Promise<ICategoryRes> {
    return this.categoryRepository.create(data);
  }

  async updateCategory(
    id: string,
    data: ICategoryCreateUpdate,
  ): Promise<ICategoryRes> {
    return this.categoryRepository.update({ _id: id }, data);
  }

  async deleteCategory(id: string): Promise<IRes> {
    return this.categoryRepository.delete({ _id: id });
  }
}
