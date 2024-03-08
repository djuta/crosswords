import { Puz } from '@dylanarmstrong/puz';

interface Puzzle extends Omit<Puz, 'solution' | 'grid'> {
  puzzleId: string,
  status: number,
  solution: string[][],
  grid: Required<Puz>['grid']
}

export default Puzzle;
