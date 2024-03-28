import Puzzle from '@/types/puzzle';
import { getLocalStorageObj, setLocalStorageObj } from '@/utils/local-storage';
import { useEffect, useState } from 'react';

const SOLUTION_KEY = 'solution';
const PUZZLE_KEY = 'puzzle';

const uploadPuzzleFile = async (file: File): Promise<Puzzle> => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/adhoc-puzzle', {
    method: 'POST',
    body: formData,
  });
  const { data } = await res.json();
  return data;
};

export default function useAdhocPuzzle() {
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState<Puzzle['solution']>();

  useEffect(() => {
    const storedPuzzle = getLocalStorageObj(PUZZLE_KEY);
    const storedSolution = getLocalStorageObj(SOLUTION_KEY);
    if (storedPuzzle) {
      setPuzzle(storedPuzzle);
    }
    if (storedSolution) {
      setSolution(storedSolution);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (puzzle) {
      setLocalStorageObj(PUZZLE_KEY, puzzle);
    }
  }, [puzzle]);

  useEffect(() => {
    if (solution) {
      setLocalStorageObj(SOLUTION_KEY, solution);
    }
  }, [solution]);

  const uploadPuzzle = async (file: File) => {
    const puzObj = await uploadPuzzleFile(file);
    setPuzzle(puzObj);
  };

  return {
    uploadPuzzle,
    puzzle,
    setSolution,
    solution,
    isLoading,
  };
}
