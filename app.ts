require('dotenv').config();
import express, { Request, Response } from 'express';
import { GlobalErrorHandler } from './src/utils/ErrorHandler/globalErrHandler';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
// import './sequelize';
import { sequelize } from './sequelize';

import { router as userRoute } from './src/route/user.router';
import User from './src/models/User/user.model';

const app = express();
const port = process.env.PORT || 3000;

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/user', userRoute);

app.use(GlobalErrorHandler);

app.listen(port, async () => {
  console.log(`server running on port ${port}`);
  //await sequelize.sync({ force: true }); // never use in production =))
  await sequelize.authenticate();
});
