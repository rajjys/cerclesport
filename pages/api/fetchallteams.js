import { promises as fs } from 'fs';
import path from 'path';
    export default async function handler (req, res) {
      const league = req.body.league;
      const division = req.body.division;
      const myPath = path.join(process.cwd(), `data/${league}S2324/${division}/teams.json`)
      const teams = await fs.readFile(myPath, 'utf8');
      const parsedTeams = JSON.parse(teams);
      return res.status(200).json(parsedTeams);
    }