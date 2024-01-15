import nextConnect from 'next-connect';
import middleware from '@/middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
   try { // Convert the object back to a JSON string;
            const league = req.body.league;
            const stadiums = req.body.stadiums;
            const fieldString = `${league}.stadiums`;
            let unsetObj = {};
            unsetObj[fieldString] = '';
            await req.db.collection('24').updateOne({}, { $unset: unsetObj });
            let pushObj = {}
            pushObj[fieldString] = { $each: stadiums };
            await req.db.collection('24').updateOne({}, { $push: pushObj });
            //console.log(doc);
            //res.json(doc);
            res.status(200).json({ message: league + " - " + ' - Stadiums Updated successfully'});}
    catch(error){
        res.status(500).json({ message: "Error storing stadiums data" });
    }
});

export default handler;