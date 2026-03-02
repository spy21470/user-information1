import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;   // ดึงจาก Render

const client = new MongoClient(uri);

await client.connect();
console.log("MongoDB connected");

const mongo = client.db("webphuket");

export default mongo;
