import express, { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Client } from "../interfaces/IClient";
import { collections } from "../services/database.service";

export const router = Router();
router.use(express.json());

router.get("/", async (_req: Request, res: Response) => {
  try {
    // const clients = (await collections.clients.find({}).toArray) as Client[];
  } catch (error) {
    res.status(500).json(error);
  }
});
