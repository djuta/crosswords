'use client';

import Puzzle from '@/types/puzzle';
import React from 'react';
import PuzzleGrid from './puzzle-grid';
import PuzzleClues from './puzzle-clues';

interface CrosswordProps {
  puzzle: Puzzle;
}

export default function CrosswordPuzzle({ puzzle }: CrosswordProps) {
  return (
    <div className="container mx-auto max-w-lg">
      <h2 className="text-2xl font-bold mb-4">{puzzle.meta.title}</h2>
      <div className="mb-4">
        <div className="grid grid-cols-16 gap-1">
          <PuzzleGrid grid={puzzle.grid} />
        </div>
      </div>
      <PuzzleClues clues={puzzle.clues} />
    </div>
  );
}
