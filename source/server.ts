import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { connectToDatabase } from "./services/database.service";
import { router } from "./routes/clients.router";

dotenv.config();

const app: Express = express();

connectToDatabase()
  .then(() => {
    app.use(morgan("dev"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use((req, res, next) => {
      // Setting cors policy
      res.header("Access-Controll-Allow-Origin", "*");
      // set cors headers
      res.header(
        "Access-Control-Allow-Headers",
        "origin, X-Requested-With,Content-Type,Accept, Authorization"
      );
      // set cors method headers
      if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return res.status(200).json({});
      }
      next();
    });

    app.use("/api", router);

    // Error handling
    app.use((req, res, next) => {
      const error = new Error("not found");
      return res.status(404).json({
        message: error.message,
      });
    });

    const httpServer = http.createServer(app);
    const PORT = process.env.PORT ?? 6600;
    httpServer.listen(PORT, () =>
      console.log(`The server is running on port ${PORT}`)
    );
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
