////Fetch the latest games in the database regardless of division or league
import { promises as fs } from 'fs';
import path from 'path';
    export default async function handler (req, res) {
      
      const myPath = path.join(process.cwd(), `data/`);
      const games = readGames(myPath);
      const parsedGames = JSON.parse(games);
      return res.status(200).json(parsedGames);
    }

    async function readGames(dir) {
        let games = [];
        const files = await fs.readdir(dir);
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stat = await fs.stat(filePath);
          if (stat.isDirectory()) {
            await readGames(filePath);
          } else if (file === 'games.json') {
            const data = await fs.readFile(filePath, 'utf8');
            games.push(...JSON.parse(data));
          }
        }
        return games;
      }