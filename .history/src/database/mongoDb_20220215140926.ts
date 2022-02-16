import { MongoClient } from "mongodb";

require("dotenv").config();

const mongoPath = process["env"]["MONGO_DEV_PATH"];

const client = new MongoClient(mongoPath);

async function main(dbName, collectionname) {
  await client.connect();
  const db = client.db(dbName);
  console.log("Connected to mongo server");
  const collection = db.collection(collectionname);
  return collection
}

export { main };
