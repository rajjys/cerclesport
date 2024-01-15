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
      let gamesByTeam = [];
      let game;
      for(let i = 0; i < games.length; i++){
          game = games[i];
        if((game.team1.slug == slug) || (game.team2.slug == slug))
              gamesByTeam.push(game);
      }
      ///sort by date
      gamesByTeam.sort(function(game1, game2){
          let key1 = new Date(game1.dateAndTime);
          let key2 = new Date(game2.dateAndTime);
          return key2 - key1
      })
      return res.status(200).json(gamesByTeam);
});

export default handler;
  