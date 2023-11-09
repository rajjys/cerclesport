import { promises as fs } from 'fs';
import path from 'path';
    export default async function handler (req, res) {
      const myPath = path.join(process.cwd(), 'data/games.json')
      const games = await fs.readFile(myPath, 'utf8');
      const parsedGames = JSON.parse(games);
      return res.status(200).json(parsedGames);
    }