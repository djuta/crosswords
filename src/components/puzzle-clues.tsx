import { ClueTuple } from '@/types/clue';
import { CellDirection } from '@/types/puzzle';

type PuzzleCluesProps = {
  clues: ClueTuple[];
  direction: string;
  selected: CellDirection | undefined;
}

export default function PuzzleClues({ clues, direction, selected }: PuzzleCluesProps) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">{direction}</h3>
      {clues.map(([clueNumber, clueText]) => (
        <div key={clueNumber} className={`ml-2 ${clueNumber === selected?.clueIndex ? 'bg-blue-100' : 'bg-white'}`}>
          {clueNumber}
          .
          {' '}
          {clueText}
        </div>
      ))}
    </div>
  );
}
