import { promises as fs } from 'fs';
export default async function handler (req, res) {
    const teams = await fs.readFile('data/teams.json', 'utf8');
      const parsedTeams = JSON.parse(teams);
    ///filter to one object
    const slug = req.body;
    let team;
    for(let i=0; i < parsedTeams.length; i++){
        team = parsedTeams[i];
       if(team.slug == slug) break;
    }
    return res.status(200).json(team);
  }