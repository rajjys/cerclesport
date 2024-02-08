import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_DB_URI;
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
            const division = req.body.division;
            const teams = req.body.teams;
            const fieldString = `${league}.${division}.teams`;
            let unsetObj = {};
            unsetObj[fieldString] = '';
            await db.collection('24').updateOne({}, { $unset: unsetObj });
            let pushObj = {}
            pushObj[fieldString] = { $each: teams };
            await db.collection('24').updateOne({}, { $push: pushObj });
            //console.log(doc);
            //res.json(doc);
            res.status(200).json({ message: league + " - " + division + ' - Teams Updated successfully'});}
    catch(error){
        res.status(500).json({ message: "Error" });
    }
}