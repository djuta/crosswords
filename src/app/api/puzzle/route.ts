import { NextRequest } from 'next/server';
import { getPuzzle } from '@/services/puzzles';

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const file: File | null = formData.get('file') as unknown as File;
  if (!file) {
    return Response.json({ message: 'File is required.' }, { status: 400 });
  }
  try {
    const puzzle = await getPuzzle(file);
    return Response.json({ data: puzzle });
  } catch {
    return Response.json({ message: 'Internal server error.' }, { status: 500 });
  }
};
