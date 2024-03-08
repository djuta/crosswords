'use client';

import React from 'react';
import Puzzle from '@/types/puzzle';
import useClues from '@/hooks/use-clues';
import useSolution from '@/hooks/use-solution';
import PuzzleGrid from './puzzle-grid';
import PuzzleClues from './puzzle-clues';

interface CrosswordPuzzleProps {
  puzzle: Puzzle;
}

export default function CrosswordPuzzle({ puzzle }: CrosswordPuzzleProps) {
  const {
    clues,
    setCurrentCell,
    selectedAcrossNumber,
    selectedDownNumber,
  } = useClues({ grid: puzzle.grid });

  const {
    userSolution,
    setUserSolutionCell,
    shouldShowSolution,
    toggleShowSolution,
  } = useSolution(puzzle.solution);

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
              onCellSelected={setCurrentCell}
            />
          )}
          <button type="button" onClick={toggleShowSolution}>
            {shouldShowSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        </div>
        <div className="flex-1 flex">
          {clues?.across && <PuzzleClues clues={clues.across} direction="Across" selectedNumber={selectedAcrossNumber} />}
          {clues?.down && <PuzzleClues clues={clues.down} direction="Down" selectedNumber={selectedDownNumber} />}
        </div>
      </div>
    </div>
  );
}
