import { promises as fs } from 'fs';
import path from 'path';
export default async function handler (req, res) {
    const {slug, division, league} = req.body;
    const myPath = path.join(process.cwd(), `data/${league}S2324/${division}/teams.json`);
    const teams = await fs.readFile(myPath, 'utf8');
      const parsedTeams = JSON.parse(teams);
      
    ///filter to one object
    let team;
    for(let i=0; i < parsedTeams.length; i++){
        team = parsedTeams[i];
       if(team.slug == slug) break;
    }
    return res.status(200).json(team);
  }