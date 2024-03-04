import PuzzleDto from '@/dtos/puzzle-dto';
import getDb from '@/db/db';
import Puzzle from '@/types/puzzle';
import PuzzleSummaryDto from '@/dtos/puzzle-summary-dto';
import { ObjectId } from 'mongodb';

type PuzzleSchema = Omit<PuzzleDto, 'puzzleId'> & {
  _id: ObjectId
}

type PuzzleSummarySchema = Omit<PuzzleSummaryDto, 'puzzleId'> & {
  _id: ObjectId
}

type AllSchema = PuzzleSchema | PuzzleSummarySchema;

type AllDto = PuzzleDto | PuzzleSummaryDto;

const convertSchemaToDto = ({ _id, ...rest }: AllSchema): AllDto => ({
  ...rest,
  puzzleId: _id.toString(),
});

const puzzleSummaryProjection = {
  status: 1,
  meta: 1,
  _id: 1,
};

export const insertPuzzle = async (userId: string, puzzle: Puzzle): Promise<string> => {
  const db = await getDb();
  const collection = db.collection<Omit<PuzzleDto, '_id'>>('puzzles');
  const { insertedId } = await collection.insertOne({ userId, ...puzzle, status: 0 });
  return insertedId.toString();
};

export const getPuzzle = async (userId: string, puzzleId: string): Promise<PuzzleDto | null> => {
  const db = await getDb();
  const collection = db.collection<PuzzleSchema>('puzzles');
  const puzzle = await collection.findOne({ _id: new ObjectId(puzzleId), userId });
  if (!puzzle) {
    throw new Error('error getting puzzle');
  }
  return convertSchemaToDto(puzzle) as PuzzleDto;
};

export const getPuzzleSummary = async (userId: string, puzzleId: string):
Promise<PuzzleSummaryDto | null> => {
  const db = await getDb();
  const collection = db.collection<PuzzleSummarySchema>('puzzles');
  const puzzle = await collection.findOne(
    { _id: new ObjectId(puzzleId), userId },
    { projection: puzzleSummaryProjection },
  );
  if (!puzzle) {
    throw new Error('error getting puzzle');
  }
  return convertSchemaToDto(puzzle);
};

export const getPuzzles = async (userId: string): Promise<PuzzleSummaryDto[]> => {
  const db = await getDb();
  const collection = db.collection<PuzzleSummarySchema>('puzzles');
  const cursor = await collection.find<PuzzleSummarySchema>(
    { userId },
    { projection: puzzleSummaryProjection },
  );
  const puzzles = await cursor.toArray();
  return puzzles.map((puzzle) => convertSchemaToDto(puzzle));
};
