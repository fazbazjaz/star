import { database } from "../database/connection";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // we chain methods eg. select() and from() to the db object
    const query = await database.select().from(users);
    // console.log("getAllUsers query:", query);

    const payload = query;
    // console.log("getAllUsers payload:", payload);

    res.json({ success: true, payload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const requestedUserId = Number(req.params.userId);
    // console.log("getUserById requestedUserId:", requestedUserId);

    // notice eq() Equal To (it must be imported at the top)
    const query = await database
      .select()
      .from(users)
      .where(eq(users.id, requestedUserId));
    // console.log("getUserById query:", query);

    const payload = query[0];
    // console.log("getUserById payload:", payload);

    res.json({ success: true, payload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
