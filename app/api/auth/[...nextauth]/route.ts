
import React from 'react';
import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import type { Session, User, Account, Profile } from "next-auth";

type JwtParams = {
  token: JWT;
  user?: User;
  account?: Account | null;
  profile?: Profile;
  isNewUser?: boolean;
  trigger?: "signIn" | "signUp" | "update";
  session?: Session;
};

export const authOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, account }: JwtParams): Promise<JWT> {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
