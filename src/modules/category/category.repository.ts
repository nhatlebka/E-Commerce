import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base-repository';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoryRepository extends BaseRepository<CategoryDocument> {
  protected entityDocument: CategoryDocument;

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }
}
