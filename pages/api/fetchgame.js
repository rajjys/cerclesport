import { promises as fs } from 'fs';
import path from 'path';
export default async function handler (req, res) {
    const myPath = path.join(process.cwd(), 'data/games.json')
    const games = await fs.readFile(myPath, 'utf8');
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