import PuzzleUpload from '@/components/puzzle-upload';
import Puzzles from '@/components/puzzles';
import { PuzzlesProvider } from '@/context/puzzles-context';
import { getPuzzles } from '@/services/puzzles';
import { getUser } from '@/services/user';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export const dynamic = 'force-dynamic';

const Crosswords = async () => {
  const user = await getUser();
  const puzzles = await getPuzzles(user?.userId);
  return (
    <PuzzlesProvider puzzles={puzzles}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-50">
        <h1>Puzzles</h1>
        <Puzzles />
        <PuzzleUpload />
      </main>
    </PuzzlesProvider>
  );
};

export default withPageAuthRequired(Crosswords, { returnTo: '/crosswords' });
