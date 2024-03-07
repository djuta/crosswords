import getDb from '@/db/db';
import { Document, ObjectId } from 'mongodb';
import Solution from '@/types/solution';

type SolutionSchema = Solution & {
  _id: ObjectId,
  userId: string,
  puzzleId: string,
}

const convertSchemaToDto = ({ _id, ...rest }: SolutionSchema): Solution => ({
  ...rest,
});

const getCollection = async <Type extends Document>() => {
  const db = await getDb();
  return db.collection<Type>('solution');
};

export const insertSolution = async (userId: string, puzzleId: string, solution: Solution):
Promise<string> => {
  const collection = await getCollection<Omit<SolutionSchema, '_id'>>();
  const { insertedId } = await collection.insertOne({ userId, puzzleId, ...solution });
  return insertedId.toString();
};

export const getSolution = async (userId: string, puzzleId: string): Promise<Solution> => {
  const collection = await getCollection<SolutionSchema>();
  const puzzle = await collection.findOne({ puzzleId, userId });
  if (!puzzle) {
    throw new Error('error getting solution');
  }
  return convertSchemaToDto(puzzle);
};

export const updateSolution = async (userId: string, puzzleId: string, solution: Solution) => {
  const collection = await getCollection<SolutionSchema>();
  const filter = { puzzleId, userId };
  const update = {
    $set: {
      grid: solution.grid,
    },
  };
  try {
    await collection.updateOne(filter, update, {});
  } catch {
    throw new Error('error updating solution');
  }
};
