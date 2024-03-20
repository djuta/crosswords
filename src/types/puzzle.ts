import { Puz } from 'puz-parser';

export * from 'puz-parser';

interface Puzzle extends Omit<Puz, 'solution' | 'grid'> {
  puzzleId: string,
  status: number,
  solution: string[][],
  grid: Required<Puz>['grid']
}

export default Puzzle;
