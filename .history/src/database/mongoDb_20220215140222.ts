import { MongoClient } from "mongodb";

require("dotenv").config();

const mongoPath = process["env"]["MONGO_DEV_PATH"];
