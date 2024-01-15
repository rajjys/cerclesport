import nextConnect from 'next-connect';
import middleware from '@/middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    // Convert the object back to a JSON string;
    const league = req.body.league;
    const division = req.body.division;
    const slug = req.body.slug;
    const fieldString = `${league}.${division}.games`;
    let projectionObject = {_id: 0};
    projectionObject[fieldString] = 1;
    let doc = await req.db.collection('24').findOne({}, { projection: projectionObject });
    let games = doc[league][division].games;
    ///filter to one object
    let game;
    for(let i=0; i < games.length; i++){
          game = games[i];
        if(game.slug == slug) break;
    }

    return res.status(200).json(game);
});

export default handler;

  