import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Client } from "../interfaces/IClient";
import { collections } from "../services/database.service";

export const getAllClients = async (_req: Request, res: Response) => {
  try {
    const clients = await collections.clients?.find({}).toArray();
    res.status(200).json({ clients });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getClient = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };

    const client = await collections.clients?.findOne(query);

    res.status(200).json({ client });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const newClient = async (req: Request, res: Response) => {
  try {
    const newClient = req.body as Client;
    const result = await collections.clients?.insertOne(newClient);
    res.status(201).json({
      message: "New client was successfully created",
      client: { ...newClient, _id: result?.insertedId },
    });
    // testing
    // res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  try {
    const updatedClient: Client = req.body as Client;
    const query = { _id: new ObjectId(id) };

    const result = await collections.clients?.updateOne(query, {
      $set: updatedClient,
    });
    result
      ? res.status(200).json({ result })
      : res.status(304).json(`Client with id ${id} did not update`);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.clients?.deleteOne(query);
    if (result && result.deletedCount) {
      res
        .status(200)
        .json({ message: `Successfully removed client with id: ${id}` });
    } else if (!result) {
      res.status(400).send(`Failed to removed client with id: ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Client with id ${id} does not exists`);
    }
  } catch (error) {
    console.error(error);

    res.status(500).json(error);
  }
};
