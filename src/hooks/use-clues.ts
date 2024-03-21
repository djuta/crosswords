import Puzzle, { Cell, Row } from '@/types/puzzle';
import { useEffect, useMemo, useState } from 'react';
import Clues from '@/types/clue';

const getCluesFromGrid = (grid: Puzzle['grid']) => grid.reduce((acc: Clues, row: Row) => {
  row.forEach((cell) => {
    if (cell.isStart && cell.isDown && cell.down.clue) {
      acc.down.push([cell.clueIndex, cell.down.clue]);
    }
    if (cell.isStart && cell.isAcross && cell.across.clue) {
      acc.across.push([cell.clueIndex, cell.across.clue]);
    }
  });
  return acc;
}, { across: [], down: [] });

export default function useClues({ grid }: { grid: Puzzle['grid'] }) {
  const [isAcross, setIsAcross] = useState(true);
  const [selectedCells, setSelectedCells] = useState<number[]>();
  const [currentCell, setCurrentCell] = useState<Cell>();
  const clues = useMemo(() => getCluesFromGrid(grid), [grid]);
  const toggleDirection = () => setIsAcross((value) => !value);

  const createClueSelectHandler = (direction: 'across' | 'down') => (
    clueNumber: number,
  ) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const row of grid) {
      const cell = row.find((c) => c[direction].clueIndex === clueNumber);
      if (cell) {
        setCurrentCell(cell);
        setIsAcross(direction === 'across');
        break;
      }
    }
  };

  useEffect(() => {
    if (!currentCell) {
      return;
    }
    const cellDirection = isAcross ? 'across' : 'down';
    setSelectedCells(currentCell[cellDirection].cells);
  }, [isAcross, currentCell]);

  return {
    isAcross,
    currentCell,
    selectedCells,
    setCurrentCell,
    clues,
    toggleDirection,
    createClueSelectHandler,
  };
}
