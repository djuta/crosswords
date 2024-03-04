'use client';

import React from 'react';
import { usePuzzlesContext } from '@/context/puzzles-context';

interface StatusMapType {
  [key: number]: string
}

const StatusMap: StatusMapType = {
  0: 'New',
  1: 'In Progress',
  3: 'Complete',
};

export default function Puzzles() {
  const { puzzles } = usePuzzlesContext();
  if (puzzles.length === 0) {
    return <p>No puzzles</p>;
  }
  return (
    <ul className="grid grid-cols-4 gap-4">
      {puzzles.map((puzzle) => (
        <li key={puzzle.puzzleId} className="relative bg-white p-5 shadow-md rounded-lg overflow-clip">
          <a href={`/crosswords/${puzzle.puzzleId}`}>
            <div className="w-full flex justify-center">
              {/* <Image width="200" height="200" src="/cw.png" alt="" /> */}
            </div>
            <h2 className="line-clamp-2 text-base font-bold mt-5">{puzzle.title}</h2>
            <p className="text-sm">
              Author:
              {puzzle.author}
            </p>
            <p className="absolute top-0 right-0 text-xs bg-green-300 px-2 py-1 py">{StatusMap[puzzle.status]}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
