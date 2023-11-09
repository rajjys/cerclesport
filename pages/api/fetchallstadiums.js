import { promises as fs } from 'fs';
import path from 'path';
    export default async function handler (req, res) {
      const myPath = path.join(process.cwd(), 'data/stadiums.json')
      const stadiums = await fs.readFile(myPath, 'utf8');
      const parsedStadiums = JSON.parse(stadiums)
      return res.status(200).json(parsedStadiums);
    }