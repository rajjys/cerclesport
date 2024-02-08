import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
  const MONGODB_DB = 'cercleSport';

  async function getDb() {
      if (!global.mongoClient) {
      global.mongoClient = new MongoClient(MONGODB_URI, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
      }).connect();
      }

      const client = await global.mongoClient;
      return client.db(MONGODB_DB);
  }

  let db = await getDb();
   try { // Convert the object back to a JSON string;
            const league = req.body.league;
            const stadiums = req.body.stadiums;
            const fieldString = `${league}.stadiums`;
            let unsetObj = {};
            unsetObj[fieldString] = '';
            await db.collection('24').updateOne({}, { $unset: unsetObj });
            let pushObj = {}
            pushObj[fieldString] = { $each: stadiums };
            await db.collection('24').updateOne({}, { $push: pushObj });
            //console.log(doc);
            //res.json(doc);
            res.status(200).json({ message: league + " - " + ' - Stadiums Updated successfully'});}
    catch(error){
        res.status(500).json({ message: "Error storing stadiums data" });
    }
}