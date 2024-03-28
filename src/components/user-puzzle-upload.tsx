'use client';

import useUploadPuzzle from '@/hooks/use-upload-puzzle';
import PuzzleUpload from './puzzle-upload';

export default function UserPuzzleUpload() {
  const uploadPuzzle = useUploadPuzzle();
  return <PuzzleUpload uploadPuzzle={uploadPuzzle} />;
}
