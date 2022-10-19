// external dependencies
import express, { Router } from "express";
import {
  deleteClient,
  getAllClients,
  getClient,
  newClient,
  updateClient,
} from "../controllers/clients";
// global config
export const router = Router();
router.use(express.json());

// get
router.delete("/clients/:id", deleteClient);
router.put("/clients/:id", updateClient);
router.get("/clients/:id", getClient);
router.get("/clients", getAllClients);
router.post("/clients", newClient);
