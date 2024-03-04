import Puzzle from '@/types/puzzle';

type PuzzleGridProps = Pick<Puzzle, 'grid'>

export default function PuzzleGrid({ grid }: PuzzleGridProps) {
  return grid.map((row, rowIndex) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={rowIndex} className="flex">
      {row.map((cell, colIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`${rowIndex}-${colIndex}`} className="w-8 h-8 border border-gray-300 flex justify-center items-center">
          {cell === '.' ? null : (
            <input
              type="text"
              maxLength={1}
              className="w-full h-full text-center outline-none"
              disabled={cell === '.'}
            />
          )}
        </div>
      ))}
    </div>
  ));
}
