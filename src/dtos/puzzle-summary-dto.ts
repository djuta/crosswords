import PuzzleDto from '@/dtos/puzzle-dto';

type PuzzleSummaryDto = Pick<PuzzleDto, 'puzzleId' | 'status' | 'meta'>

export default PuzzleSummaryDto;
