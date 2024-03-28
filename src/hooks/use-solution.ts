import Puzzle from '@/types/puzzle';
import { Reveal } from '@/types/reveal';
import { useState } from 'react';

interface UserSolutionParams {
  solution: Puzzle['solution']
  initialUserSolution: Puzzle['solution'] | undefined
}

export default function useSolution({ solution, initialUserSolution }: UserSolutionParams) {
  const [solutionReveal, setSolutionReveal] = useState(Reveal.None);
  const [userSolution, setUserSolution] = useState(
    initialUserSolution ?? solution.map((row) => row.map(() => '')),
  );

  const buildSolutionRevealToggle = (reveal: Reveal) => () => {
    setSolutionReveal((value: Reveal) => (value === reveal ? Reveal.None : reveal));
  };

  const setUserSolutionCell = (row: number, col: number, char: string) => {
    setUserSolution((oldSolution) => {
      const newSolution = [...oldSolution];
      newSolution[row][col] = char;
      return newSolution;
    });
  };

  return {
    userSolution,
    setUserSolutionCell,
    setSolutionReveal,
    solutionReveal,
    toggleShowPuzzle: buildSolutionRevealToggle(Reveal.PuzzleSolution),
    toggleShowWord: buildSolutionRevealToggle(Reveal.WordSolution),
    toggleCheckPuzzle: buildSolutionRevealToggle(Reveal.CheckPuzzle),
    toggleCheckWord: buildSolutionRevealToggle(Reveal.CheckWord),
  };
}
