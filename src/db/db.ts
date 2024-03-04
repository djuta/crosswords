import { Db, MongoClient } from 'mongodb';

let db: Db;

export default async function getDb() {
  const {
    MONGO_USER_NAME,
    MONGO_APP_NAME,
    MONGO_URI,
    MONGO_PASSWORD,
  } = process.env;

  if (db) {
    return db;
  }
  const url = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PASSWORD}@${MONGO_URI}/?retryWrites=true&w=majority&appName=${MONGO_APP_NAME}`;
  const client = new MongoClient(url);
  await client.connect();
  db = client.db('crossword-app');
  return db;
}
