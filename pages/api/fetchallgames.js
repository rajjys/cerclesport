import { promises as fs } from 'fs';
import path from 'path';
    export default async function handler (req, res) {
      const league = req.body.league;
      const division = req.body.division;
      const number = req.body.number;
      const myPath = path.join(process.cwd(), `data/${league}S2324/${division}/games.json`);
      const games = await fs.readFile(myPath, 'utf8');
      const parsedGames = JSON.parse(games);
      if(number) return res.status(200).json(parsedGames.slice(0, 7));
      return res.status(200).json(parsedGames);
    }