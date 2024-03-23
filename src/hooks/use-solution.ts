import Puzzle from '@/types/puzzle';
import { Reveal } from '@/types/reveal';
import { useState } from 'react';

export default function useSolution(solution: Puzzle['solution']) {
  const [solutionReveal, setSolutionReveal] = useState(Reveal.None);
  const [userSolution, setUserSolution] = useState(
    solution.map((row) => row.map(() => '')),
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
