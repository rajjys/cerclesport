import nextConnect from 'next-connect';
import middleware from '@/middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    // Convert the object back to a JSON string;
    const {slug, division, league} = req.body;
    const fieldString = `${league}.${division}.teams`;
    let projectionObject = {_id: 0};
    projectionObject[fieldString] = 1;
    let doc = await req.db.collection('24').findOne({}, { projection: projectionObject });
    let teams = doc[league][division].teams;
    ///filter to one object
  let team;
  for(let i=0; i < teams.length; i++){
      team = teams[i];
     if(team.slug == slug) break;
  }
  return res.status(200).json(team);
});

export default handler;
  
  