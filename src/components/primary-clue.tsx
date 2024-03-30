import { Cell } from '@/types/puzzle';

type PrimaryClueProps = {
  currentCell: Cell | undefined
  isAcross: boolean
}

export default function PrimaryClue({ currentCell, isAcross }: PrimaryClueProps) {
  const direction = isAcross ? 'across' : 'down';
  const directionSuffix = isAcross ? 'A' : 'D';
  const { clue, clueIndex } = currentCell?.[direction] ?? {};
  return (
    <div className="h-16 px-6 bg-green-100 flex items-center ">
      <div className="mr-3 font-bold">
        {clueIndex}
        {clueIndex && directionSuffix}
      </div>
      <div>
        {clue}
      </div>
    </div>
  );
}
