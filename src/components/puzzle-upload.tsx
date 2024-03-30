'use client';

import React from 'react';

interface PuzzleUploadProps {
  // eslint-disable-next-line no-unused-vars
  uploadPuzzle: (file: File) => void
}

// eslint-disable-next-line no-unused-vars
export default function PuzzleUpload({ uploadPuzzle }: PuzzleUploadProps) {
  const handleOnSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files) {
      // eslint-disable-next-line no-alert
      alert('No file selected!');
      return;
    }
    uploadPuzzle(files[0]);
  };

  return (
    <form className="text-center">
      <div>
        <label className="cursor-pointer p-3 rounded-lg block bg-green-500 text-white" htmlFor="fileUpload">
          <span className="block">Select a .puz file:</span>
          <input className="block sr-only" type="file" id="fileUpload" name="fileUpload" accept=".puz" onChange={handleOnSubmit} />
        </label>
      </div>
    </form>
  );
}
