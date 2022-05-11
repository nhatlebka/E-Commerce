import { HttpException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'vmo_proj' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadBarcode(data) {
    const rs = await v2.uploader.upload(data, { folder: 'vmo_proj' });
    return rs;
  }

  async deleteImage(public_id: string): Promise<any> {
    try {
      const rs = await v2.uploader.destroy('vmo_proj/' + public_id);
      return rs;
    } catch (error) {
      throw new HttpException('Delete image from cloudinary failed', 500);
    }
  }
}
