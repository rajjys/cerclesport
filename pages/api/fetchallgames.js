import { promises as fs } from 'fs';
    export default async function handler (req, res) {
      const games = await fs.readFile('data/games.json', 'utf8');
      const parsedGames = JSON.parse(games);
      console.log(parsedGames);
      return res.status(200).json(parsedGames);
    }