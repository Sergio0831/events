import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address..." });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://sergejs:sergio0831@nodeexpressprojects.1vapw.mongodb.net/events?retryWrites=true&w=majority"
    );
    const db = client.db();
    await db.collection("emails").insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: "Signed up" });
  }
};

export default handler;
