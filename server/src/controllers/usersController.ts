import { database } from "../database/connection";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { logger } from "../logger";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const query = await database.select().from(users);
    logger.info("getAllUsers query:", query);

    const data = query;
    logger.info("getAllUsers data:", data);

    res.json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const requestedUserId = Number(req.params.id);
    // console.log("getUserById requestedUserId:", requestedUserId);

    const query = await database
      .select()
      .from(users)
      .where(eq(users.id, requestedUserId));
    // console.log("getUserById query:", query);

    const data = query[0];
    logger.info("getUserById data:", data);

    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
