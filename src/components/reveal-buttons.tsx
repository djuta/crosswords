import { Reveal } from '@/types/reveal';
import ButtonWithDialog from '@/components/button-with-dialog';

type RevealButtonsProps = {
  solutionReveal: Reveal
  toggleShowPuzzle: () => void
  toggleShowWord: () => void
  toggleCheckPuzzle: () => void
  toggleCheckWord: () => void
}

export default function RevealButtons({
  solutionReveal,
  toggleShowPuzzle,
  toggleShowWord,
  toggleCheckPuzzle,
  toggleCheckWord,
}: RevealButtonsProps) {
  const buttons = [
    {
      type: Reveal.PuzzleSolution,
      toggle: toggleShowPuzzle,
      showText: 'Show Puzzle',
      hideText: 'Hide Puzzle',
      confirmBody: 'This will reveal the entire puzzle solution.',
    },
    {
      type: Reveal.WordSolution,
      toggle: toggleShowWord,
      showText: 'Show Word',
      hideText: 'Hide Word',
      confirmBody: 'This will reveal the selected word.',
    },
    {
      type: Reveal.CheckPuzzle,
      toggle: toggleCheckPuzzle,
      showText: 'Check Puzzle',
      hideText: 'Uncheck Puzle',
      confirmBody: 'This will reveal letters that are incorrect for the entire puzzle solution.',
    },
    {
      type: Reveal.CheckWord,
      toggle: toggleCheckWord,
      showText: 'Check Word',
      hideText: 'Uncheck Word',
      confirmBody: 'This will reveal letters that are incorrect for the selected word.',
    },
  ];

  return buttons.map(({
    type, toggle, showText, hideText, confirmBody,
  }) => (
    <ButtonWithDialog
      className="text-sm mx-3"
      key={type}
      type="button"
      onClick={toggle}
      shouldShowDialog={solutionReveal !== type}
      dialogTitle="Are you sure?"
      dialogBody={confirmBody}
      dialogOkText="Got it"
    >
      {solutionReveal === type ? hideText : showText}
    </ButtonWithDialog>
  ));
}
