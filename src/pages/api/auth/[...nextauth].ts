import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface ISignInRes {
  id: number;
  name: string;
  image: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const { name, password } = credentials as {
          name: string;
          password: string;
        };

        const data = await axios
          .post<ISignInRes>("http://localhost:3000/auth/sign-in", {
            name,
            password,
          })
          .then((res) => res.data);

        return data;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = Number(token.sub);
      return session;
    },
  },
});
