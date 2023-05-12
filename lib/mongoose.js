import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

export async function connectToDatabase() {
  console.log("Connecting to database...");
  if (client && client.topology && client.topology.isConnected()) {
    return client.db();
  }

  client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client.db();
}

export async function disconnectFromDatabase() {
  if (client && client.topology && client.topology.isConnected()) {
    await client.close();
    client = undefined;
  }
}
