import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8085;
const app = express();
