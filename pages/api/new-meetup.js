import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://jubi1838:<password>@cluster0.fmfz8dt.mongodb.net/connect?retryWrites=true&w=majority"
    );
    const db = client.db();
    const connectCollection = db.collection("connect");
    const result = await connectCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Connect inserted" });
  }
}

export default handler;
