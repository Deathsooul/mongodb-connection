import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { router } from "./routes";

dotenv.config();

const port = process.env.PORT || 8085;
const app = express();

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));
app.use(router);

app.listen(port, () => {
  console.info(`Server listen on port ${port}`);
});
