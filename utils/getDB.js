import { MongoClient } from "mongodb";

  const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
  const MONGODB_DB = 'cercleSport';

  export default async function getDb() {
      if (!global.mongoClient) {
      global.mongoClient = new MongoClient(MONGODB_URI, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
      }).connect();
      }

      const client = await global.mongoClient;
      return client.db(MONGODB_DB);
  }