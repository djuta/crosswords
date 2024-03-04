import Puzzle from '@/types/puzzle';

type PuzzleDto = Puzzle & {
  userId: string
}

export default PuzzleDto;
