import Puzzle from './puzzle';

type PuzzleSummary = Puzzle['meta'] & {
  puzzleId: Puzzle['puzzleId']
  status: Puzzle['status']
}

export default PuzzleSummary;
