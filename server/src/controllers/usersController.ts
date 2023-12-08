import { Request, Response } from "express";
import { getAllUsers, getUserById } from "../helpers/users";
import { logger } from "../logger";

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const query = await getAllUsers();
    logger.info({ message: "getAllUsersHandler query", value: query });

    const data = query;
    logger.info({ message: "getAllUsersHandler data", value: data });

    res.json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    logger.info({
      message: "getUserByIdHandler userId",
      userId
    });

    const query = await getUserById(userId);
    logger.info({ message: "getUserByIdHandler query", value: query });

    const data = query[0];
    logger.info({ message: "getUserByIdHandler data", value: data });

    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
