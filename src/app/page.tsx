import { getUser } from '@/services/user';
import { redirect } from 'next/navigation';

export default async function Index() {
  const user = await getUser();

  if (user) {
    redirect('/crosswords');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-50">
      <h1>Auth</h1>
      <a href="/api/auth/login">Login or Signup</a>
    </main>
  );
}
