import { database } from '../database/connection';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // we chain methods eg. select() and from() to the db object
    const query = await database.select().from(users);
    console.log('query:', query);
    res.json(query);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    console.log('userId:', userId);
    // notice eq() Equal To (it must be imported at the top)
    const query = await database
      .select()
      .from(users)
      .where(eq(users.id, userId));
    res.json(query);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error' });
  }
};
