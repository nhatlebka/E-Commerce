import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { ImageQueryDto } from 'src/modules/images/images.dto';
import { IRes } from '../auth/users.interface';
import { IImageRes } from './images.interface';
import { ImagesService } from './images.service';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Roles(Role.Admin, Role.Root, Role.Staff)
  @Get()
  @ApiBearerAuth()
  async getImages(@Query() query: ImageQueryDto): Promise<IImageRes[]> {
    return this.imagesService.getImages(query);
  }

  @Roles(Role.Admin, Role.Root)
  @Post('upload-img')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['name', 'type', 'file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: any,
  ): Promise<IImageRes> {
    try {
      const rs = await this.imagesService.createImage(file, data);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Roles(Role.Admin, Role.Root)
  @Delete('delete-img/:public_id')
  @ApiBearerAuth()
  async deleteImage(@Param('public_id') public_id: string): Promise<IRes> {
    try {
      const rs = this.imagesService.deleteImage(public_id);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
