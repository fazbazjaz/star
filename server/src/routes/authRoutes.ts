import express, { Request, Response } from 'express';
import {
  authorizationCodePopupHandler,
  authorizationCodeRedirectHandler,
  accessTokenHandler,
  idTokenHandler
} from '../controllers/authController';

export const authRouter = express.Router();

// for a basic check on /api/auth/
authRouter.get('/', (req: Request, res: Response) => {
  res.json('STAR Server /api/auth Auth Route');
});

authRouter.post('/google/authorizationcode', authorizationCodePopupHandler);
authRouter.get('/google/authorizationcode', authorizationCodeRedirectHandler);
authRouter.post('/google/accesstoken', accessTokenHandler);
authRouter.post('/google/idtoken', idTokenHandler);
