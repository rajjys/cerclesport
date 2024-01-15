import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('mongodb+srv://rajjys:kwL3Vbt95ry2xSeO@cluster0.6ks4zoa.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  req.dbClient = client;
  req.db = client.db('cercleSport');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;