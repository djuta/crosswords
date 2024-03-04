import { usePuzzlesContext } from '@/context/puzzles-context';
import PuzzleSummary from '@/types/puzzle-summary';

const uploadPuzzleFile = async (file: File): Promise<PuzzleSummary> => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/upload-puzzle', {
    method: 'POST',
    body: formData,
  });
  const { data } = await res.json();
  return data;
};

export default function useUploadPuzzle() {
  const { setPuzzles } = usePuzzlesContext();
  return async (file: File) => {
    const puzzle = await uploadPuzzleFile(file);
    setPuzzles((puzzles) => puzzles.concat([puzzle]));
  };
}
