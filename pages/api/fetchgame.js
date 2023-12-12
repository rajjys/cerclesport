import { promises as fs } from 'fs';
import path from 'path';
export default async function handler (req, res) {
    // Convert the object back to a JSON string;
    const {slug, division, league} = req.body;
    const myPath = path.join(process.cwd(), `data/${league}S2324/${division}/games.json`)
    const games = await fs.readFile(myPath, 'utf8');
      const parsedGames = JSON.parse(games);
      
    ///filter to one object
    let game;
    for(let i=0; i < parsedGames.length; i++){
        game = parsedGames[i];
       if(game.slug == slug) break;
    }
    return res.status(200).json(game);
  }