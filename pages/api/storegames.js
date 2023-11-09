import { promises as fs } from 'fs';
import path from 'path';
    export default async function handler (req, res) {
        try {
            ///console.log(req.body);
            // Convert the object back to a JSON string
            const updatedData = JSON.stringify(req.body);
      
            // Write the updated data to the JSON file
            const myPath = path.join(process.cwd(), 'data/games.json')
            await fs.writeFile(myPath, updatedData);
      
            // Send a success response
            res.status(200).json({ message: 'Games Updated successfully' });
          } catch (error) {
            console.error(error);
            // Send an error response
            res.status(500).json({ message: 'Error storing Games' });
          }
    }