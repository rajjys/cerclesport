import { promises as fs } from 'fs';
import path from 'path';
    export default async function handler (req, res) {
        try {
           // Convert the object back to a JSON string;
           const league = req.body.league;
           const division = req.body.division;
           const teams = req.body.teams;
     
           // Write the updated data to the JSON file
           const myPath = path.join(process.cwd(), `data/${league}S2324/${division}/teams.json`);
           console.log(myPath);
           await fs.writeFile(myPath, JSON.stringify(teams));
      
            // Send a success response
            res.status(200).json({ message: league + " - " + division + ' - Teams Updated successfully'});
          } catch (error) {
            console.error(error);
            // Send an error response
            res.status(500).json({ message: 'Error storing Teams data: ' + league });
          }
    }