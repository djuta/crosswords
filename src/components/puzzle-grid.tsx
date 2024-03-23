import React from 'react';
import Puzzle, { Cell } from '@/types/puzzle';
import { Reveal } from '@/types/reveal';
import TwoWayMap from '@/utils/two-way-map';

type PuzzleGridProps = Pick<Required<Puzzle>, 'grid' | 'solution'> & {
  solutionReveal: Reveal,
  userSolution: string[][]
  // eslint-disable-next-line no-unused-vars
  onInputChange: (row: number, col: number, char: string) => void
  // eslint-disable-next-line no-unused-vars
  onCellSelected: (cell: Cell) => void
  selectedCells: number[] | undefined
  toggleDirection: () => void
  isAcross: boolean,
}

const REMOVE_CHAR_KEYS = ['Backspace', 'Delete'];

export default function PuzzleGrid({
  grid,
  solution,
  userSolution,
  solutionReveal,
  onInputChange,
  onCellSelected,
  selectedCells,
  toggleDirection,
  isAcross,
}: PuzzleGridProps) {
  const width = grid[0].length;

  const tabIndexElements = new TwoWayMap<number, HTMLInputElement | null>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const { value } = e.target;
    const lastLetter = value.charAt(value.length - 1);
    onInputChange(row, col, lastLetter.toUpperCase());
  };

  const handleInputOnClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (e.target === document.activeElement) {
      toggleDirection();
    }
  };

  const isSelectedClueCell = (rowIndex: number, colIndex: number) => {
    const cellNumber = (width * (rowIndex + 1)) - (width - colIndex);
    return !!selectedCells?.includes(cellNumber);
  };

  const getTabIndex = (rowIndex: number, colIndex: number) => {
    const x = isAcross ? rowIndex : colIndex;
    const y = isAcross ? colIndex : rowIndex;
    return (width * (x + 1)) - (width - (y + 1));
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const index = tabIndexElements.getKey(e.target as HTMLInputElement);

    if (!index) {
      return;
    }

    const nextInput = REMOVE_CHAR_KEYS.includes(e.key)
      ? tabIndexElements.getPrev(index)
      : tabIndexElements.getNext(index);

    if (nextInput) {
      nextInput.focus();
    }
  };

  const getSolutionValue = (rowIndex: number, colIndex: number) => {
    const isSelectedCell = isSelectedClueCell(rowIndex, colIndex);
    const userSolutionLetter = userSolution[rowIndex][colIndex];
    const solutionLetter = solution[rowIndex][colIndex];
    switch (solutionReveal) {
      case Reveal.PuzzleSolution:
        return solutionLetter;
      case Reveal.WordSolution:
        return isSelectedCell ? solutionLetter : userSolutionLetter;
      default:
        return userSolutionLetter;
    }
  };

  const getBorder = (rowIndex: number, colIndex: number) => {
    const isSelectedCell = isSelectedClueCell(rowIndex, colIndex);
    const userSolutionLetter = userSolution[rowIndex][colIndex];
    const solutionLetter = solution[rowIndex][colIndex];
    const isCorrectLetter = !userSolutionLetter || userSolutionLetter === solutionLetter;

    const isCorrectLetterForCheckPuzzle = (
      solutionReveal === Reveal.CheckPuzzle ? isCorrectLetter : true
    );

    const isCorrectLetterForCheckWord = (
      (solutionReveal === Reveal.CheckWord && isSelectedCell) ? isCorrectLetter : true
    );

    const isValid = isCorrectLetterForCheckPuzzle && isCorrectLetterForCheckWord;

    return isValid ? 'border-gray-300' : 'border-red-300';
  };

  return (
    <div>
      {grid.map((row, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={colIndex} className={`w-8 h-8 border relative ${getBorder(rowIndex, colIndex)} ${cell.isBlack ? 'bg-black' : ''}`}>
              {cell.isBlack ? '' : (
                <input
                  className={`w-full h-full text-center caret-transparent pt-2 ${isSelectedClueCell(rowIndex, colIndex) ? 'bg-blue-100' : ''}`}
                  type="text"
                  ref={(el) => tabIndexElements.set(getTabIndex(rowIndex, colIndex), el)}
                  value={getSolutionValue(rowIndex, colIndex)}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                  onMouseDown={handleInputOnClick}
                  onFocus={() => onCellSelected(cell)}
                  onKeyUp={(e) => handleOnKeyUp(e)}
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
