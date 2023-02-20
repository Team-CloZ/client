import { signInApi } from '@src/apis';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const { name, password } = credentials as {
          name: string;
          password: string;
        };
        const data = await signInApi({
          name,
          password,
        });

        if (data === undefined) {
          throw new Error('로그인에 실패했습니다.');
        }

        return data;
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: Number(token.sub),
        },
      };
    },
  },
});
