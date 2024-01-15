import nextConnect from 'next-connect';
import middleware from '@/middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    // Convert the object back to a JSON string;
    const league = req.body.league;
    const division = req.body.division;
    const fieldString = `${league}.${division}.teams`;
    let projectionObject = {_id: 0};
    projectionObject[fieldString] = 1;
    let doc = await req.db.collection('24').findOne({}, { projection: projectionObject });
    let teams = doc[league][division].teams;
    return res.status(200).json(teams);
});

export default handler;