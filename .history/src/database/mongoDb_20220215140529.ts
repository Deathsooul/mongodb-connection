import { MongoClient } from "mongodb";

require("dotenv").config();

const mongoPath = process["env"]["MONGO_DEV_PATH"];

const client = new MongoClient(mongoPath);

const dbName = "dev";

async function main() {
  await client.connect();
  console.log("Connected to mongo server");
  const db = client.db(dbName);
  const collection = db.collection("livioTemp");

}
