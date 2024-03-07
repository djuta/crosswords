import * as solutionsRepository from '@/repositories/solutions';
import Solution from '@/types/solution';

export const createSolution = async (userId: string, puzzleId: string, solution: Solution) => {
  await solutionsRepository.insertSolution(userId, puzzleId, solution);
};

export const getSolution = async (userId: string, puzzleId: string): Promise<Solution> => {
  const puzzle = await solutionsRepository.getSolution(userId, puzzleId);
  return puzzle;
};

export const updateSolution = async (userId: string, puzzleId: string, solution: Solution) => {
  const puzzle = await solutionsRepository.updateSolution(userId, puzzleId, solution);
  return puzzle;
};
