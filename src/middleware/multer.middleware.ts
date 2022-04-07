import multer, { memoryStorage } from 'multer';
import createError from 'http-errors';

const multerStorageUserAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/image/user');
  },
  filename: (req, file, cb) => {
    //@ts-ignore
    cb(null, `user-${req.user.id}-avatar.jpeg`); // override the images
  },
});

//@ts-ignore
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    //@ts-ignore
    cb(new createError(400, 'Not an image! Please upload only images.'), false);
  }
};

export const uploadUserAvatar = multer({
  storage: multerStorageUserAvatar,
  fileFilter: multerFilter,
});

export const uploadStream = multer({
  storage: memoryStorage(),
  fileFilter: multerFilter,
});
