import { NextRequest } from 'next/server';
import { getAdhocPuzzle } from '@/services/puzzles';

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const file: File | null = formData.get('file') as unknown as File;
  const puzzle = await getAdhocPuzzle(file);
  return Response.json({ data: puzzle });
};
