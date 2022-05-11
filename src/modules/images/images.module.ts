import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module';
import { ImagesController } from './images.controller';
import { ImageRepository } from './images.repository';
import { Image, ImageSchema } from './images.schema';
import { ImagesService } from './images.service';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([
      {
        name: Image.name,
        schema: ImageSchema,
      },
    ]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImageRepository],
})
export class ImagesModule {}
