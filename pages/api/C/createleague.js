import { MongoClient } from 'mongodb';
export default async function handler(req, res) {
    const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
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
    // Extract data from the request 
    const { active, name, shortname, year, city,  
        desc, country, hq, committee_by_years,
        logo_link, official_album_link } = req.body; 
    if (!name || !shortname || !year || !country) {
         return res.status(400).json({ error: 'Name, year, and country are required' });
         } 
    try { // Check if the league name already exists 
            const existingLeague = await db.collection('leagues').findOne({ [`${shortname}`]: { $exists: true } }); 
            if (existingLeague) {
                 return res.status(409).json({ error: 'League name already exists' }); 
            } 
          // Create a new record 
            const newLeague = {[`${shortname}`]:{ active, name, shortname, year,country, city, 
                                                     createdAt: new Date(), hq, desc, 
                                                     committee_by_years, logo_link, 
                                                     official_album_link}}; 
            const result = await db.collection('leagues').insertOne(newLeague); 
            return res.status(201).json({ message: 'League created successfully', league: result }); 
        } 
        catch (error) {
             return res.status(500).json({ error: error.message });
             }
};