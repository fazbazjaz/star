import express, { Request, Response } from 'express';
import { getAllUsers, getUserById } from '../controllers/usersController';
import { authMiddleware } from '../middleware/authMiddleware';

export const usersRouter = express.Router();

// for a basic check on /api/users/
usersRouter.get('/', (req: Request, res: Response) => {
  res.json('STAR Server /api/users/ Users Route');
});

usersRouter.get('/all', authMiddleware, getAllUsers);
usersRouter.get('/id/:userId', authMiddleware, getUserById);
