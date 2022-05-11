import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base-repository';
import { Image, ImageDocument } from './images.schema';

@Injectable()
export class ImageRepository extends BaseRepository<ImageDocument> {
  protected entityDocument: ImageDocument;

  constructor(
    @InjectModel(Image.name)
    private readonly imageModel: Model<ImageDocument>,
  ) {
    super(imageModel);
  }
}
