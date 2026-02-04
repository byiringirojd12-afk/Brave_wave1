import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("learning");

    const users = await db.collection("progress")
      .aggregate([
        {
          $group: {
            _id: "$userId",
            completedLessons: {
              $sum: { $cond: ["$completed", 1, 0] }
            }
          }
        }
      ])
      .toArray();

    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
