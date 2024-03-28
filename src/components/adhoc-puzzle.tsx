'use client';

import useAdhocPuzzle from '@/hooks/use-adhoc-puzzle';
import PuzzleUpload from './puzzle-upload';
import Puzzle from './puzzle';

export default function AdhocPuzzle() {
  const {
    puzzle,
    uploadPuzzle,
    setSolution,
    solution,
    isLoading,
  } = useAdhocPuzzle();

  if (isLoading) {
    return <h1>Checking for stored puzzle...</h1>;
  }

  if (puzzle) {
    return <Puzzle puzzle={puzzle} setSolution={setSolution} initialUserSolution={solution} />;
  }

  return (
    <>
      <h1>Upload Puzzle</h1>
      <PuzzleUpload uploadPuzzle={uploadPuzzle} />
    </>
  );
}
