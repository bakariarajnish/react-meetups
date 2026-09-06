import { MongoClient } from "mongodb";

let client = null;
export default async function DBConnection() {
  client = await MongoClient.connect(
    "mongodb+srv://rajnishbakaria:Airtel$4321@cluster0.0mscsjp.mongodb.net/meetups?appName=Cluster0",
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  return meetupCollection;
}

export async function DBConnectionClose() {
  client.close();
}
