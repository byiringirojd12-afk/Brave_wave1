import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGO_URI;

if (!uri) throw new Error("❌ MONGO_URI missing in .env.local");

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDB() {
  try {
    const conn = await clientPromise;
    return conn.db("brave-wave1");
  } catch (err) {
    console.error("❌ DATABASE CONNECTION ERROR:", err.message);
    throw new Error("Database connection failed");
  }
}
