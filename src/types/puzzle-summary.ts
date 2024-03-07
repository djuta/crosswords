import Puzzle from './puzzle';

type PuzzleSummary = Pick<Puzzle, 'title' | 'author' | 'status' | 'puzzleId'>

export default PuzzleSummary;
