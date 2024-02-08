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
    // Convert the object back to a JSON string;
    const {slug, division, league} = req.body;
    const fieldString = `${league}.${division}.teams`;
    let projectionObject = {_id: 0};
    projectionObject[fieldString] = 1;
    let doc = await db.collection('24').findOne({}, { projection: projectionObject });
    let teams = doc[league][division].teams;
    ///filter to one object
  let team;
  for(let i=0; i < teams.length; i++){
      team = teams[i];
     if(team.slug == slug) break;
  }
  return res.status(200).json(team);
}
  
  