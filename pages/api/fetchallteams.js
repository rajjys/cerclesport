import { promises as fs } from 'fs';
    export default async function handler (req, res) {
      const teams = await fs.readFile('data/teams.json', 'utf8');
      const parsedTeams = JSON.parse(teams);
      return res.status(200).json(parsedTeams);
    }