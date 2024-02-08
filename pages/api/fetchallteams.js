import { MongoClient } from 'mongodb';

    export default async function handler(req, res) {
        const MONGODB_URI = "mongodb+srv://rajjys:kwL3Vbt95ry2xSeO@cluster0.6ks4zoa.mongodb.net/?retryWrites=true&w=majority";
        const MONGODB_DB = 'cercleSport';
    
        async function getDb() {
            if (!global.mongoClient) {
            global.mongoClient = new MongoClient(MONGODB_URI, {})
            .connect();
            }
    
            const client = await global.mongoClient;
            return client.db(MONGODB_DB);
        }
    
        let db = await getDb();
    // Convert the object back to a JSON string;
    const league = req.body.league;
    const division = req.body.division;
    const fieldString = `${league}.${division}.teams`;
    let projectionObject = {_id: 0};
    projectionObject[fieldString] = 1;
    let doc = await db.collection('24').findOne({}, { projection: projectionObject });
    let teams = doc[league][division].teams;
    return res.status(200).json(teams);
}