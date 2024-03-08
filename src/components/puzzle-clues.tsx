import { ClueTuple } from '@/types/clue';

type PuzzleCluesProps = {
  clues: ClueTuple[];
  direction: string;
  selectedNumber: number;
}

export default function PuzzleClues({ clues, direction, selectedNumber }: PuzzleCluesProps) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">{direction}</h3>
      {clues.map(([clueNumber, clueText]) => (
        <div key={clueNumber} className={`ml-2 ${clueNumber === selectedNumber ? 'bg-blue-100' : 'bg-white'}`}>
          {clueNumber}
          .
          {' '}
          {clueText}
        </div>
      ))}
    </div>
  );
}
