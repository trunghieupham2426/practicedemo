require('dotenv').config();
import jwt from 'jsonwebtoken';

export const generateToken = (key: Object, time: any) => {
  //@ts-ignore
  return jwt.sign(key, process.env.JWT_SECRET, {
    expiresIn: time,
  });
};
