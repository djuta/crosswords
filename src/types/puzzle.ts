interface Puzzle {
  puzzleId: string,
  status: number,
  grid: string[][];
  meta: {
    title: string;
    author: string;
    copyright: string;
    description: string;
  };
  clues: {
    across: (string | null)[];
    down: (string | null)[];
  };
}

export default Puzzle;
