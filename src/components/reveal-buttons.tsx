import { Reveal } from '@/types/reveal';

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
      type: Reveal.PuzzleSolution, toggle: toggleShowPuzzle, showText: 'Show Puzzle', hideText: 'Hide Puzzle',
    },
    {
      type: Reveal.WordSolution, toggle: toggleShowWord, showText: 'Show Word', hideText: 'Hide Word',
    },
    {
      type: Reveal.CheckPuzzle, toggle: toggleCheckPuzzle, showText: 'Check Puzzle', hideText: 'Uncheck Puzle',
    },
    {
      type: Reveal.CheckWord, toggle: toggleCheckWord, showText: 'Check Word', hideText: 'Uncheck Word',
    },
  ];

  return buttons.map(({
    type, toggle, showText, hideText,
  }) => (
    <button key={type} type="button" className="mx-3" onClick={toggle}>
      {solutionReveal === type ? hideText : showText}
    </button>
  ));
}
