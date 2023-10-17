import { promises as fs } from 'fs';
export default async function handler (req, res) {
    const games = await fs.readFile('data/games.json', 'utf8');
      const parsedGames = JSON.parse(games);
    ///filter to one object
    const slug = req.body;
    let game;
    for(let i=0; i < parsedGames.length; i++){
        game = parsedGames[i];
       if(game.slug == slug) break;
    }
    return res.status(200).json(game);
  }