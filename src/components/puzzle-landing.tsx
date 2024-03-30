'use client';

import usePuzzle from '@/hooks/use-puzzle';
import PuzzleUpload from './puzzle-upload';
import Puzzle from './puzzle';

export default function PuzzleLanding() {
  const {
    puzzle,
    uploadPuzzle,
    setSolution,
    solution,
    isLoading,
    clearPuzzle,
  } = usePuzzle();

  if (isLoading) {
    return <h1 className="text-3xl font-bold">Checking for stored puzzle...</h1>;
  }

  if (puzzle) {
    return (
      <Puzzle
        puzzle={puzzle}
        setSolution={setSolution}
        initialUserSolution={solution}
        clearPuzzle={clearPuzzle}
      />
    );
  }

  return (
    <>
      <h1 className="text-3xl mb-1 font-bold">Crosswords</h1>
      <h2 className="text-2xl mb-9">A simple web application to play .puz files</h2>
      <PuzzleUpload uploadPuzzle={uploadPuzzle} />
    </>
  );
}
