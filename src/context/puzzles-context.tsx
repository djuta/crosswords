'use client';

import React, {
  PropsWithChildren, createContext, useContext, useMemo, useState,
} from 'react';
import PuzzleSummary from '../types/puzzle-summary';

interface PuzzlesContextData {
  puzzles: PuzzleSummary[];
  setPuzzles: React.Dispatch<React.SetStateAction<PuzzleSummary[]>>
}

type PuzzlesProviderProps = PropsWithChildren<Omit<PuzzlesContextData, 'setPuzzles'>>;

export const PuzzlesContext = createContext<PuzzlesContextData>({
  puzzles: [],
  setPuzzles: () => null,
});

export function PuzzlesProvider({ children, puzzles: puzs }: PuzzlesProviderProps) {
  const [puzzles, setPuzzles] = useState(puzs);
  const value = useMemo(() => ({
    puzzles,
    setPuzzles,
  }), [puzzles, setPuzzles]);

  return (
    <PuzzlesContext.Provider value={value}>
      {children}
    </PuzzlesContext.Provider>
  );
}

export const usePuzzlesContext = () => useContext(PuzzlesContext);
