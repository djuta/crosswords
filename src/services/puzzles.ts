// @ts-expect-error old library, no type defs
import puz from 'puzjs';
import * as puzzleRepository from '@/repositories/puzzles';
import PuzzleSummary from '@/types/puzzle-summary';
import Puzzle from '@/types/puzzle';

export const uploadPuzzle = async (userId: string, puzFile: ArrayBuffer):
Promise<PuzzleSummary> => {
  const decodedPuzzle = puz.decode(puzFile);
  const puzzleId = await puzzleRepository.insertPuzzle(userId, decodedPuzzle);
  const puzzle = await puzzleRepository.getPuzzle(userId, puzzleId);
  if (!puzzle) {
    throw new Error('Error uploading puzzle');
  }
  const { status, meta } = puzzle;
  return { puzzleId, status, ...meta };
};

export const getPuzzles = async (userId: string): Promise<PuzzleSummary[]> => {
  const puzzles = await puzzleRepository.getPuzzles(userId);
  if (!puzzles) {
    throw new Error('Error getting puzzles');
  }
  return puzzles.map(({ puzzleId, status, meta }) => ({ puzzleId, status, ...meta }));
};

export const getPuzzle = async (userId: string, puzzleId: string): Promise<Puzzle> => {
  const puzzle = await puzzleRepository.getPuzzle(userId, puzzleId);
  if (!puzzle) {
    throw new Error('error getting puzzle');
  }
  return puzzle;
};
