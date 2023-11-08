import { promises as fs } from 'fs';
    export default async function handler (req, res) {
      console.log("Calling api");
      const games = await fs.readFile('data/games.json', 'utf8',(err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
      const parsedGames = JSON.parse(games);
      console.log(parsedGames);
      return res.status(200).json(parsedGames);
    }