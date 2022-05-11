import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { IRes } from '../auth/users.interface';
import { IImage, IImageRes, IQueryImage } from './images.interface';
import { ImageRepository } from './images.repository';

@Injectable()
export class ImagesService {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getImages(query: IQueryImage): Promise<IImageRes[]> {
    const filterQuery = { ...query } as any;
    if (query.name) filterQuery.name = { $regex: '.*' + query.name + '.*' };
    let sort = '';
    if (query.sort) {
      if (query.sortBy && query.sortBy === 'desc') {
        sort = '-' + query.sort;
      } else {
        sort = query.sort;
      }
    }
    delete filterQuery.limit;
    if (query.limit && query.page) {
      const { limit, page } = query;
      delete filterQuery.limit;
      delete filterQuery.page;
      return await this.imageRepository.paginate(
        filterQuery,
        limit,
        page,
        sort,
      );
    }

    return this.imageRepository.findAll(filterQuery, sort);
  }

  async createImage(
    file: Express.Multer.File,
    data: IImage,
  ): Promise<IImageRes> {
    const img = await this.cloudinaryService.uploadImage(file);
    const newData = { ...data } as any;
    newData.url = img.url;
    newData.public_id = img.public_id.split('/')[1];

    const rs = await this.imageRepository.create(newData);
    return rs;
  }

  async deleteImage(public_id: string): Promise<IRes> {
    await this.cloudinaryService.deleteImage(public_id);

    const rs = await this.imageRepository.delete({ public_id });
    return rs;
  }
}
