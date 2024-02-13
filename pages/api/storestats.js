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
            const division = req.body.division;
            const stats = req.body.stats;
            const fieldString = `${league}.${division}.stats`;
            const ppgFieldString = `${league}.${division}.stats.ppg`;
            const dppgFieldString = `${league}.${division}.stats.dppg`;
            const diffppgFieldString = `${league}.${division}.stats.diffppg`;
            const blowoutFieldString = `${league}.${division}.stats.blowouts`;
            ///Deleting old stats
            let unsetObj = {};
            unsetObj[fieldString] = '';
            await db.collection('24').updateOne({}, { $unset: unsetObj });
            ///Entering new stats
            let pushObj = {} ///Object that represents stats. Data will be added here and pushed to db
            pushObj[ppgFieldString] = { $each: stats.ppg };
            pushObj[dppgFieldString] = { $each: stats.dppg };
            pushObj[diffppgFieldString] = { $each: stats.diffppg };
            pushObj[blowoutFieldString] = { $each: stats.blowouts };

            await db.collection('24').updateOne({}, { $push: pushObj });///Insert to database

            res.status(200).json({ message: 'ok'});///Works
        }
    catch(error){
        res.status(500).json({ message: error.message });///Report the error
    }
}