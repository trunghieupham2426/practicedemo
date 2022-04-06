import multer from 'multer';
import createError from 'http-errors';

const multerStorage = multer.diskStorage({
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

export const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
