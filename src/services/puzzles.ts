import * as puzzlesRepository from '@/repositories/puzzles';
import parsePuz from '@dylanarmstrong/puz';
import PuzzleSummary from '@/types/puzzle-summary';
import Puzzle from '@/types/puzzle';

export const uploadPuzzle = async (userId: string, puz: Uint8Array):
Promise<PuzzleSummary> => {
  const decodedPuzzle = parsePuz(puz);

  let solutionIndex = 0;
  const solution: string[][] = [];
  const grid = decodedPuzzle?.grid;

  if (!grid) {
    throw new Error('no grid');
  }

  grid.forEach((row, rowIndex) => {
    solution[rowIndex] = [];
    row.forEach((cell, cellIndex) => {
      solution[rowIndex][cellIndex] = String.fromCharCode(
        decodedPuzzle.solution?.[solutionIndex] as number,
      );
      solutionIndex += 1;
    });
  });

  const newPuzzle = {
    ...decodedPuzzle, solution, status: 0, grid,
  };

  const puzzleId = await puzzlesRepository.insertPuzzle(userId, newPuzzle);
  return puzzlesRepository.getPuzzleSummary(userId, puzzleId);
};

export const getPuzzles = async (userId: string): Promise<PuzzleSummary[]> => (
  puzzlesRepository.getPuzzles(userId)
);

export const getPuzzle = async (userId: string, puzzleId: string): Promise<Puzzle> => (
  puzzlesRepository.getPuzzle(userId, puzzleId)
);
