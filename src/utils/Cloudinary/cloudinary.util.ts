import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

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
}
