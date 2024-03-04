import { getSession } from '@auth0/nextjs-auth0';

export const getUser = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return null;
  }
  return {
    userId: user.sub,
  };
};
