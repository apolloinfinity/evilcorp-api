// external Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

// global variables
export const collections: { clients?: mongoDB.Collection } = {};

// initialization connection
export async function connectToDatabase() {
  dotenv.config();
  const connection = process.env.DB_CONN_STRING as string;
  const dbName = process.env.DB_NAME as string;
  const dbCollection = process.env.EC_COLLECTION as string;
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connection);

  await client.connect();

  const db: mongoDB.Db = client.db(dbName);

  const clientsCollection: mongoDB.Collection = db.collection(dbCollection);

  collections.clients = clientsCollection;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection ${clientsCollection.collectionName}`
  );
}
