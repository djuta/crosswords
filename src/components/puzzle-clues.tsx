import Puzzle from '@/types/puzzle';

type PuzzleCluesProps = Pick<Required<Puzzle>, 'clues'>

export default function PuzzleClues({ clues }: PuzzleCluesProps) {
  return (
    <div className="flex">
      {/* Render across and down clues */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Clues</h3>
        {clues.map((clue, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="ml-2">
            {index + 1}
            .
            {clue}
          </div>
        ))}
      </div>
    </div>
  );
}
