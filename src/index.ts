import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { WilderRoutes } from "./routes/wilders.routes";
const app = express();

// DATABASE

mongoose
  .connect(
    "mongodb://root:root@localhost:27017/Wilders?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    {
      autoIndex: true,
    }
  )
  .then(() => console.log("Connected to database"))
  .catch((err: any) => console.log(err));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
app.use("/api/wilders", WilderRoutes);

//Start server
app.listen(4000, () => console.log("Server started on 4000"));
