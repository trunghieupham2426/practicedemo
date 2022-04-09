require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { GlobalErrorHandler } from './src/utils/ErrorHandler/globalErrHandler';
// import './sequelize';
import { sequelize } from './sequelize';
import { router as userRoute } from './src/route/user.router';
import { router as categoryRoute } from './src/route/category.router';
import { router as productRoute } from './src/route/product.router';

import User from './src/models/User/user.model';
//setup redis for store session
import redis, { createClient } from 'redis';
import connectRedis from 'connect-redis';
import Product from './src/models/ProductCateGory/product.model';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
// const client = createClient();
// client.on('error', (err) => console.log('Redis Client Error', err));
// const redisStore = connectRedis(session);

const app = express();
const port = process.env.PORT || 3000;
// creating 24 hours from milliseconds
const oneHour = 1000 * 60 * 60;

//session middleware
app.use(
  session({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    saveUninitialized: true,
    cookie: { maxAge: oneHour },
    resave: false,
    // store: new redisStore({
    //   host: '127.0.0.1',
    //   port: 6379,
    //   client: client,
    //   ttl: 260,
    // }),
  })
);

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// cookie parser middleware
app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);

app.use(GlobalErrorHandler);

app.listen(port, async () => {
  console.log(`server running on port ${port}`);
  //await sequelize.sync({ force: true }); // never use in production =))
  await sequelize.authenticate();
});
