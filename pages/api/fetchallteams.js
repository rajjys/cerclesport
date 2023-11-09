import { promises as fs } from 'fs';
import path from 'path';
    export default async function handler (req, res) {
      const myPath = path.join(process.cwd(), 'data/teams.json')
      const teams = await fs.readFile(myPath, 'utf8');
      const parsedTeams = JSON.parse(teams);
      return res.status(200).json(parsedTeams);
    }