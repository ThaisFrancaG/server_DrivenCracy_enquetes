import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();

console.log(mongoClient);

const db = mongoClient.db("drivencracy");
export default db;
