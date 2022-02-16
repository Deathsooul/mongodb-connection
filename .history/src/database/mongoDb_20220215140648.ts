import { MongoClient } from "mongodb";

require("dotenv").config();

const mongoPath = process["env"]["MONGO_DEV_PATH"];

const client = new MongoClient(mongoPath);



async function main(dbName) {
  await client.connect();
  console.log("Connected to mongo server");
  const db = client.db(dbName);
  return db

}

export default main();
