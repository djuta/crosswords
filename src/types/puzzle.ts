import { Puz } from '@dylanarmstrong/puz';

interface Puzzle extends Omit<Puz, 'solution'> {
  puzzleId: string,
  status: number,
  solution: string[][]
}

export default Puzzle;
