import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream from 'buffer-to-stream';
v2.config({
  cloud_name: process.env.CLOUDINARY_USER_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
  async uploadChangeAvatar(
    file: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload(
        file.path,
        {
          public_id: file.filename, // define filename
          folder: 'DEV',
        },
        function (error, result) {
          if (error) return reject(error);
          //@ts-ignore
          resolve(result);
        }
      );
    });
  }

  async uploadCategoryThumpNail(
    file: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder: 'CATEGORY',
          public_id: file.filename,
        },
        function (error, result) {
          if (error) return reject(error);
          //@ts-ignore
          resolve(result);
        }
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadProductPhoto(
    file: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          public_id: file.filename,
          folder: file.filename.includes('thumpNail')
            ? 'PRODUCT/THUMPNAIL'
            : 'PRODUCT',
        },
        function (error, result) {
          if (error) return reject(error);
          //@ts-ignore
          resolve(result);
        }
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteProductPhoto(public_ids: string[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await v2.api.delete_resources(public_ids);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }
}
