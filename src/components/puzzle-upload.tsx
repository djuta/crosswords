'use client';

import React from 'react';

interface PuzzleUploadProps {
  // eslint-disable-next-line no-unused-vars
  uploadPuzzle: (file: File) => void
}

// eslint-disable-next-line no-unused-vars
export default function PuzzleUpload({ uploadPuzzle }: PuzzleUploadProps) {
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
