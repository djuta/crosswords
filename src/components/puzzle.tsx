'use client';

import React, { useEffect } from 'react';
import Puzzle from '@/types/puzzle';
import useClues from '@/hooks/use-clues';
import useSolution from '@/hooks/use-solution';
import PuzzleGrid from './puzzle-grid';
import PuzzleClues from './puzzle-clues';
import PrimaryClue from './primary-clue';
import RevealButtons from './reveal-buttons';
import ButtonWithDialog from './button-with-dialog';

interface CrosswordPuzzleProps {
  puzzle: Puzzle
  // eslint-disable-next-line no-unused-vars
  setSolution: (solutiomn: Puzzle['solution']) => void
  initialUserSolution: Puzzle['solution'] | undefined;
  clearPuzzle: () => void;
}

export default function CrosswordPuzzle({
  puzzle, setSolution, initialUserSolution, clearPuzzle,
}: CrosswordPuzzleProps) {
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
    solutionReveal,
    toggleShowPuzzle,
    toggleShowWord,
    toggleCheckPuzzle,
    toggleCheckWord,
  } = useSolution({ solution: puzzle.solution, initialUserSolution });

  useEffect(() => {
    if (setSolution) {
      setSolution(userSolution);
    }
  }, [setSolution, userSolution]);

  if (!puzzle.grid) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-6 flex-1 mr-9">{puzzle.title}</h1>
        <div className="flex flex-1 items-start">
          <div className="flex-1">
            <RevealButtons
              solutionReveal={solutionReveal}
              toggleShowPuzzle={toggleShowPuzzle}
              toggleShowWord={toggleShowWord}
              toggleCheckPuzzle={toggleCheckPuzzle}
              toggleCheckWord={toggleCheckWord}
            />
          </div>
          <ButtonWithDialog
            className="text-sm text-red-600"
            type="button"
            onClick={clearPuzzle}
            dialogTitle="Are you sure?"
            dialogBody="This will delete the current puzzle."
            dialogOkText="Got it"
          >
            Clear Puzzle
          </ButtonWithDialog>
        </div>
      </div>
      <div className="flex min-h-0">
        <div className="flex flex-col flex-1 items-center mr-9">
          <div className="mb-6 w-full">
            <PrimaryClue currentCell={currentCell} isAcross={isAcross} />
          </div>
          <PuzzleGrid
            grid={puzzle.grid}
            solution={puzzle.solution}
            solutionReveal={solutionReveal}
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
