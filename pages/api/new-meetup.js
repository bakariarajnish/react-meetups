import DBConnection, { DBConnectionClose } from "../../components/common/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    //const { title, image, description, address } = data;
    try {
      const meetupCollection = await DBConnection();
      const result = await meetupCollection.insertOne(data);
      console.log(result);
      DBConnectionClose();
      res.status(201).json({ message: "Meetup inserted" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default handler;
