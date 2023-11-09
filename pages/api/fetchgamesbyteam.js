import { promises as fs } from 'fs';
import path from 'path';
export default async function handler (req, res) {
    const myPath = path.join(process.cwd(), 'data/games.json')
    const games = await fs.readFile(myPath, 'utf8');
      const parsedGames = JSON.parse(games);
    ///filter to one object
    const slug = req.body;
    let gamesByTeam = [];
    let game;
    for(let i = 0; i < parsedGames.length; i++){
        game = parsedGames[i];
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
  }