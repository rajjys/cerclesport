////Fetch the latest games in the database regardless of division or league
import { promises as fs } from 'fs';
import path from 'path';
    export default async function handler (req, res) {
      
      const games = [];
      const leaguesPath = path.join(process.cwd(), `data/leagues.json`);
      const leagues = await fs.readFile(leaguesPath, 'utf8');
      const parsedLeagues = JSON.parse(leagues);
      ///Run through the object
      parsedLeagues.forEach(league => {
        for(const [leagueName, leagueData] of Object.entries(league)){
          leagueData['divisions'].forEach(division => {
            games.push(fetchGames(leagueName, division));
          })
        }
      });
      console.log(games);
      ///const parsedGames = JSON.parse(games);
      return res.status(200).json(true);
    }
    async function fetchGames(league, division){
      
    }