import { promises as fs } from 'fs';
    export default async function handler (req, res) {
      const stadiums = await fs.readFile('data/stadiums.json', 'utf8');
      const parsedStadiums = JSON.parse(stadiums)
      return res.status(200).json(parsedStadiums);
    }