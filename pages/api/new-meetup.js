//api route는 컴포넌트 함수를 입력하는 것이 아님. 서버사이드 코드를 포함하는 함수를 정의함.
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://jubi1838:5BnpzlPnZf6GbPq9@cluster0.fmfz8dt.mongodb.net/connect?retryWrites=true&w=majority"
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
