import { ClueTuple } from '@/types/clue';
import { CellDirection } from '@/types/puzzle';
import { useEffect, useRef } from 'react';

type PuzzleCluesProps = {
  clues: ClueTuple[];
  selected: CellDirection | undefined;
  // eslint-disable-next-line no-unused-vars
  onClueSelected: (clueNumber: number) => void
}

export default function PuzzleClues({ clues, selected, onClueSelected }: PuzzleCluesProps) {
  const clueRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!selected?.clueIndex) {
      return;
    }
    const clueRef = clueRefs.current[selected.clueIndex];
    clueRef?.scrollIntoView();
  }, [selected, clues]);

  return (
    <ol className="overflow-scroll bg-white py-3">
      {clues.map(([clueNumber, clueText]) => (
        <li key={clueNumber} ref={((el) => { clueRefs.current[clueNumber] = el; })} className={`${clueNumber === selected?.clueIndex ? 'bg-blue-100' : 'bg-white'}`}>
          <button type="button" className="flex text-left text-sm py-1 px-3" onClick={() => onClueSelected(clueNumber)}>
            <div className="mr-3 font-bold w-5">
              {clueNumber}
            </div>
            <div className="flex-2">
              {clueText}
            </div>
          </button>
        </li>
      ))}
    </ol>
  );
}
