import Puzzle from '@/types/puzzle';
import { useState } from 'react';

export default function useSolution(solution: Puzzle['solution']) {
  const [shouldShowSolution, setShouldShowSolution] = useState(false);
  const [userSolution, setUserSolution] = useState(
    solution.map((row) => row.map(() => '')),
  );

  const toggleShowSolution = () => {
    if (!shouldShowSolution && !window.confirm('Are you sure you want to see the solution')) {
      return;
    }
    setShouldShowSolution((value) => !value);
  };

  const setUserSolutionCell = (row: number, col: number, char: string) => {
    setUserSolution((oldSolution) => {
      const newSolution = [...oldSolution];
      newSolution[row][col] = char;
      return newSolution;
    });
  };
  return {
    userSolution, toggleShowSolution, setUserSolutionCell, shouldShowSolution,
  };
}
