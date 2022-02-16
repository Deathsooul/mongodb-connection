import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8085;
const app = express();

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan(dev));
