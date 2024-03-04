'use client';

import React from 'react';
import useUploadPuzzle from '@/hooks/use-upload-puzzle';

export default function PuzzleUpload() {
  const uploadPuzzle = useUploadPuzzle();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [file] = e.currentTarget.fileUpload.files;
    uploadPuzzle(file);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="fileUpload">
          Select a .puz file:
          <input type="file" id="fileUpload" name="fileUpload" accept=".puz" />
        </label>
      </div>
      <div>
        <input type="submit" value="Upload File" />
      </div>
    </form>
  );
}
