import * as puzzlesRepository from '@/repositories/puzzles';
import parsePuz from 'puz-parser';
import PuzzleSummary from '@/types/puzzle-summary';
import Puzzle from '@/types/puzzle';

const createPuzzleFromFile = async (file: File) => {
  const puzFile = await file.arrayBuffer();
  const puz = new Uint8Array(puzFile);
  const decodedPuzzle = parsePuz(puz);
  let solutionIndex = 0;
  const solution: string[][] = [];

  if (!decodedPuzzle?.grid) {
    throw new Error('no grid');
  }

  const { grid } = decodedPuzzle;

  decodedPuzzle.grid.forEach((row, rowIndex) => {
    solution[rowIndex] = [];
    row.forEach((cell, cellIndex) => {
      solution[rowIndex][cellIndex] = String.fromCharCode(
        decodedPuzzle.solution?.[solutionIndex] as number,
      );
      solutionIndex += 1;
    });
  });

  return {
    ...decodedPuzzle, solution, status: 0, grid,
  };
};

export const uploadPuzzle = async (userId: string, puz: File): Promise<PuzzleSummary> => {
  const newPuzzle = await createPuzzleFromFile(puz);
  const puzzleId = await puzzlesRepository.insertPuzzle(userId, newPuzzle);
  return puzzlesRepository.getPuzzleSummary(userId, puzzleId);
};

export const getPuzzles = async (userId: string): Promise<PuzzleSummary[]> => (
  puzzlesRepository.getPuzzles(userId)
);

export const getPuzzle = async (userId: string, puzzleId: string): Promise<Puzzle> => (
  puzzlesRepository.getPuzzle(userId, puzzleId)
);

export const getAdhocPuzzle = async (puz: File): Promise<Puzzle> => {
  const newPuzzle = await createPuzzleFromFile(puz);
  return { puzzleId: '0', ...newPuzzle };
};
