import {
  AppRouterPageRoute, withPageAuthRequired,
} from '@auth0/nextjs-auth0';
import CrosswordPuzzle from '@/components/puzzle';
import { getPuzzle } from '@/services/puzzles';
import { getUser } from '@/services/user';

interface CrosswordParams {
  params: {
    id: string
  }
}

const Crossword = async ({ params }: CrosswordParams) => {
  const user = await getUser();
  const puzzle = await getPuzzle(user?.userId, params?.id);
  return (
    <main className="flex max-w-screen max-h-screen h-screen flex-col items-center justify-between p-10">
      <CrosswordPuzzle puzzle={puzzle} />
    </main>
  );
};

export default withPageAuthRequired(Crossword as AppRouterPageRoute, { returnTo: ({ params }) => `/crossword/${params?.id}` });
