import Puzzle from '@/types/puzzle';

type PuzzleCluesProps = Pick<Puzzle, 'clues'>

export default function PuzzleClues({ clues }: PuzzleCluesProps) {
  return (
    <div className="mt-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Across</h3>
        <ol className="list-decimal pl-6">
          {clues.across.map((clue, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`across-${index}`} className="mb-1">{clue}</li>
          ))}
        </ol>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Down</h3>
        <ol className="list-decimal pl-6">
          {clues.down.map((clue, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`down-${index}`} className="mb-1">{clue}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
