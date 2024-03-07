'use client';

import Puzzle from '@/types/puzzle';
import React, { useState } from 'react';
import PuzzleGrid from './puzzle-grid';
import PuzzleClues from './puzzle-clues';

interface CrosswordPuzzleProps {
  puzzle: Puzzle;
}

export default function CrosswordPuzzle({ puzzle }: CrosswordPuzzleProps) {
  const [shouldShowSolution, setShouldShowSolution] = useState(false);
  const [userSolution, setUserSolution] = useState(
    puzzle.solution.map((row) => row.map(() => '')),
  );

  const toggleShowSolution = () => {
    if (!shouldShowSolution) {
      window.confirm('Are you sure you want to see the solution');
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

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">{puzzle.title}</h2>
      <div className="flex">
        <div className="flex-1">
          {puzzle.grid && (
            <PuzzleGrid
              grid={puzzle.grid}
              solution={puzzle.solution}
              shouldShowSolution={shouldShowSolution}
              userSolution={userSolution}
              onInputChange={setUserSolutionCell}
            />
          )}
          <button type="button" onClick={toggleShowSolution}>
            {shouldShowSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        </div>
        <div className="flex-1">
          {puzzle.clues && <PuzzleClues clues={puzzle.clues} />}
        </div>
      </div>
    </div>
  );
}
