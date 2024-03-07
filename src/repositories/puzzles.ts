import getDb from '@/db/db';
import Puzzle from '@/types/puzzle';
import { Document, ObjectId } from 'mongodb';
import PuzzleSummary from '@/types/puzzle-summary';

type PuzzleSchema = Omit<Puzzle, 'puzzleId'> & {
  userId: string
  _id: ObjectId
}

type PuzzleSummarySchema = Omit<PuzzleSummary, 'puzzleId'> & {
  userId: string
  _id: ObjectId
}

const convertDocumentToPuzzle = ({ _id, ...rest }:
PuzzleSchema | PuzzleSummarySchema): Puzzle | PuzzleSummary => ({
  ...rest,
  puzzleId: _id.toString(),
});

const puzzleSummaryProjection = {
  status: 1,
  title: 1,
  author: 1,
  _id: 1,
};

const getCollection = async <Type extends Document>() => {
  const db = await getDb();
  return db.collection<Type>('puzzles');
};

export const insertPuzzle = async (userId: string, puzzle: Omit<Puzzle, 'puzzleId'>): Promise<string> => {
  const collection = await getCollection<Omit<PuzzleSchema, '_id'>>();
  const { insertedId } = await collection.insertOne({ userId, ...puzzle, status: 0 });
  return insertedId.toString();
};

export const getPuzzle = async (userId: string, puzzleId: string): Promise<Puzzle> => {
  const collection = await getCollection<PuzzleSchema>();
  const puzzle = await collection.findOne({ _id: new ObjectId(puzzleId), userId });
  if (!puzzle) {
    throw new Error('error getting puzzle');
  }
  return convertDocumentToPuzzle(puzzle) as Puzzle;
};

export const getPuzzleSummary = async (userId: string, puzzleId: string):
Promise<PuzzleSummary> => {
  const collection = await getCollection<PuzzleSummarySchema>();
  const puzzle = await collection.findOne(
    { _id: new ObjectId(puzzleId), userId },
    { projection: puzzleSummaryProjection },
  );
  if (!puzzle) {
    throw new Error('error getting puzzle');
  }
  return convertDocumentToPuzzle(puzzle);
};

export const getPuzzles = async (userId: string): Promise<PuzzleSummary[]> => {
  const collection = await getCollection<PuzzleSummarySchema>();
  const cursor = await collection.find<PuzzleSummarySchema>(
    { userId },
    { projection: puzzleSummaryProjection },
  );
  const puzzles = await cursor.toArray();
  return puzzles.map((puzzle) => convertDocumentToPuzzle(puzzle));
};
