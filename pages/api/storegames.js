import { promises as fs } from 'fs';
import path from 'path';
    export default async function handler (req, res) {
        try {
            // Convert the object back to a JSON string;
            const league = req.body.league;
            const division = req.body.division;
            const games = req.body.games;
      
            // Write the updated data to the JSON file
            const myPath = path.join(process.cwd(), `data/${league}S2324/${division}/games.json`);
            await fs.writeFile(myPath, JSON.stringify(games));
      
            // Send a success response
            res.status(200).json({ message: league + " - " + division + ' - Games Updated successfully'});
          } catch (error) {
            console.error(error);
            // Send an error response
            res.status(500).json({ message: 'Error storing Games data' + league });
          }
    }