import { MongoClient } from "mongodb";

const url = 'mongodb://0.0.0.0:27017';
const dbName = "webphuket"

const client = new MongoClient(url);

await client.connect();
const mongo = client.db(dbName);

export default mongo;
