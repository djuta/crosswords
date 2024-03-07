import React from 'react';
import Puzzle from '@/types/puzzle';

type PuzzleGridProps = Pick<Required<Puzzle>, 'grid' | 'solution'> & {
  shouldShowSolution: boolean,
  userSolution: string[][],
  // eslint-disable-next-line no-unused-vars
  onInputChange: (row: number, col: number, char: string) => void
}

export default function PuzzleGrid({
  grid, solution, userSolution, shouldShowSolution, onInputChange,
}: PuzzleGridProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    // Update puzzle grid value
    onInputChange(row, col, e.target.value.toUpperCase());
  };
  const solutionValue = shouldShowSolution ? solution : userSolution;
  return (
    <div>
      {grid.map((row, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={colIndex} className={`w-11 h-11 border relative border-gray-300 ${cell.isBlack ? 'bg-black' : ''}`}>
              {cell.isBlack ? '' : (
                <input
                  type="text"
                  maxLength={1}
                  value={solutionValue[rowIndex][colIndex]}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                  className="w-full h-full text-center"
                />
              )}
              {cell.isStart && (
              <div className="absolute top-0 left-0 text-xs font-semibold transform">
                {cell.isAcross ? cell.across.clueIndex : cell.down.clueIndex}
              </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
