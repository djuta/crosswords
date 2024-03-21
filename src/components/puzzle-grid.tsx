import React from 'react';
import Puzzle, { Cell } from '@/types/puzzle';

type PuzzleGridProps = Pick<Required<Puzzle>, 'grid' | 'solution'> & {
  shouldShowSolution: boolean
  userSolution: string[][]
  // eslint-disable-next-line no-unused-vars
  onInputChange: (row: number, col: number, char: string) => void
  // eslint-disable-next-line no-unused-vars
  onCellSelected: (cell: Cell) => void
  selectedCells: number[] | undefined
  toggleDirection: () => void
  isAcross: boolean,
}

export default function PuzzleGrid({
  grid,
  solution,
  userSolution,
  shouldShowSolution,
  onInputChange,
  onCellSelected,
  selectedCells,
  toggleDirection,
  isAcross,
}: PuzzleGridProps) {
  const width = grid[0].length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    // Update puzzle grid value
    onInputChange(row, col, e.target.value.toUpperCase());
  };

  const handleInputOnClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (e.target === document.activeElement) {
      toggleDirection();
    }
  };

  const isSelectedClueCell = (rowIndex: number, colIndex: number) => {
    const cellNumber = (width * (rowIndex + 1)) - (width - colIndex);
    return selectedCells?.includes(cellNumber);
  };

  const getTabIndex = (rowIndex: number, colIndex: number) => {
    const x = isAcross ? rowIndex : colIndex;
    const y = isAcross ? colIndex : rowIndex;
    return (width * (x + 1)) - (width - (y + 1));
  };

  // TODO: handle black cells by creating an array of avaialable indicies
  // TODO: handle back/delete
  // const handleOnKeyUp = (rowIndex: number, colIndex: number) => {
  //   const tabIndex = getTabIndex(rowIndex, colIndex);
  //   const nextTabIndex = tabIndex + 1;
  //   const nextInput = document.querySelector(`[tabindex="${nextTabIndex}"]`) as HTMLInputElement;
  //   if (nextInput) {
  //     nextInput.focus();
  //   }
  // };

  const solutionValue = shouldShowSolution ? solution : userSolution;
  return (
    <div>
      {grid.map((row, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={colIndex} className={`w-8 h-8 border relative border-gray-300 ${cell.isBlack ? 'bg-black' : ''}`}>
              {cell.isBlack ? '' : (
                <input
                  className={`w-full h-full text-center caret-transparent pt-2 ${isSelectedClueCell(rowIndex, colIndex) ? 'bg-blue-100' : ''}`}
                  type="text"
                  maxLength={1}
                  value={solutionValue[rowIndex][colIndex]}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                  onMouseDown={handleInputOnClick}
                  onFocus={() => onCellSelected(cell)}
                  // onKeyUp={() => handleOnKeyUp(rowIndex, colIndex)}
                  tabIndex={getTabIndex(rowIndex, colIndex)}
                />
              )}
              {cell.isStart && (
                <div className="absolute top-0 left-0 text-[11px] font-semibold transform">
                  {cell.clueIndex}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
