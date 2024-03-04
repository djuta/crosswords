import { NextRequest } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { uploadPuzzle } from '@/services/puzzles';
import { getUser } from '@/services/user';

export const POST = withApiAuthRequired(async (request: NextRequest) => {
  const user = await getUser();
  const formData = await request.formData();
  const file: File | null = formData.get('file') as unknown as File;
  const puzFile = await file.arrayBuffer();
  const puzzle = await uploadPuzzle(user?.userId, puzFile);
  return Response.json({ data: puzzle });
});
