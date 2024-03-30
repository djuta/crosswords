import parsePuz from 'puz-parser';
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

export const getPuzzle = async (puz: File): Promise<Puzzle> => {
  try {
    const newPuzzle = await createPuzzleFromFile(puz);
    return { puzzleId: '0', ...newPuzzle };
  } catch {
    throw new Error('Error parsing puz file');
  }
};
