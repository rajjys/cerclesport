import nextConnect from 'next-connect';
import middleware from '@/middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
   try { // Convert the object back to a JSON string;
            const league = req.body.league;
            const division = req.body.division;
            const teams = req.body.teams;
            const fieldString = `${league}.${division}.teams`;
            let unsetObj = {};
            unsetObj[fieldString] = '';
            await req.db.collection('24').updateOne({}, { $unset: unsetObj });
            let pushObj = {}
            pushObj[fieldString] = { $each: teams };
            await req.db.collection('24').updateOne({}, { $push: pushObj });
            //console.log(doc);
            //res.json(doc);
            res.status(200).json({ message: league + " - " + division + ' - Teams Updated successfully'});}
    catch(error){
        res.status(500).json({ message: "Error" });
    }
});

export default handler;