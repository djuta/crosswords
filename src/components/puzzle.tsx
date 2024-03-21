'use client';

import React from 'react';
import Puzzle from '@/types/puzzle';
import useClues from '@/hooks/use-clues';
import useSolution from '@/hooks/use-solution';
import PuzzleGrid from './puzzle-grid';
import PuzzleClues from './puzzle-clues';
import PrimaryClue from './primary-clue';

interface CrosswordPuzzleProps {
  puzzle: Puzzle;
}

export default function CrosswordPuzzle({ puzzle }: CrosswordPuzzleProps) {
  const {
    clues,
    setCurrentCell,
    currentCell,
    selectedCells,
    toggleDirection,
    isAcross,
    createClueSelectHandler,
  } = useClues({ grid: puzzle.grid });

  const {
    userSolution,
    setUserSolutionCell,
    shouldShowSolution,
    toggleShowSolution,
  } = useSolution(puzzle.solution);

  if (!puzzle.grid) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex">
        <h2 className="text-2xl font-bold mb-9 flex-1 mr-9">{puzzle.title}</h2>
        <div className="flex-1">
          <button type="button" onClick={toggleShowSolution}>
            {shouldShowSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        </div>
      </div>
      <div className="flex min-h-0">
        <div className="flex flex-col flex-1 items-center mr-9">
          <div className="my-3 w-full">
            <PrimaryClue currentCell={currentCell} isAcross={isAcross} />
          </div>
          <PuzzleGrid
            grid={puzzle.grid}
            solution={puzzle.solution}
            shouldShowSolution={shouldShowSolution}
            userSolution={userSolution}
            onInputChange={setUserSolutionCell}
            selectedCells={selectedCells}
            onCellSelected={setCurrentCell}
            toggleDirection={toggleDirection}
            isAcross={isAcross}
          />
        </div>
        <div className="flex-1 flex h-full">
          <div className="flex flex-col flex-1 mr-3">
            <h3>Across</h3>
            <PuzzleClues
              clues={clues.across}
              selected={currentCell?.across}
              onClueSelected={createClueSelectHandler('across')}
            />
          </div>
          <div className="flex flex-col flex-1">
            <h3>Down</h3>
            <PuzzleClues
              clues={clues.down}
              selected={currentCell?.down}
              onClueSelected={createClueSelectHandler('down')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
