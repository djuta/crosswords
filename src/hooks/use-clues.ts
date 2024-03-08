import Puzzle from '@/types/puzzle';
import { useEffect, useMemo, useState } from 'react';
import { Cell, Row } from '@dylanarmstrong/puz';
import Clues from '@/types/clue';

const getCluesFromGrid = (grid: Puzzle['grid']) => grid?.reduce((acc: Clues, row: Row) => {
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
  const [currentCell, setCurrentCell] = useState<Cell>();
  const [selectedAcrossNumber, setSelectedAcrossNumber] = useState(0);
  const [selectedDownNumber, setSelectedDownNumber] = useState(0);
  const clues = useMemo(() => getCluesFromGrid(grid), [grid]);
  const toggleDirection = () => setIsAcross((value) => !value);

  useEffect(() => {
    if (currentCell?.across.clueIndex) {
      setSelectedAcrossNumber(currentCell.across.clueIndex);
    }
    if (currentCell?.down.clueIndex) {
      setSelectedDownNumber(currentCell.down.clueIndex);
    }
  }, [currentCell]);

  return {
    isAcross,
    currentCell,
    setCurrentCell,
    clues,
    toggleDirection,
    selectedAcrossNumber,
    selectedDownNumber,
  };
}
