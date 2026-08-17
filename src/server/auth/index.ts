import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    signIn({ user }) {
      return user.email === process.env.ADMIN_EMAIL;
    },
    jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (token.email) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
});
