import nextConnect from 'next-connect';
import middleware from '@/middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
   try { // Convert the object back to a JSON string;
            const league = req.body.league;
            const division = req.body.division;
            const games = req.body.games;
            const fieldString = `${league}.${division}.games`;
            let unsetObj = {};
            unsetObj[fieldString] = '';
            await req.db.collection('24').updateOne({}, { $unset: unsetObj });
            let pushObj = {}
            pushObj[fieldString] = { $each: games };
            await req.db.collection('24').updateOne({}, { $push: pushObj });
            res.status(200).json({ message: league + " - " + division + ' - Games Updated successfully'});}
    catch(error){
        res.status(500).json({ message: "Error" });
    }
});

export default handler;