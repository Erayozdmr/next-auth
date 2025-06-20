import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

const NAMESPACE = "https://yourapp.example.com"; // Burayı kendi domain/inle değiştir

export const authOptions: NextAuthOptions = {
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
    signIn: "/login", // Özel login sayfan
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // JWT token güncelleme
    async jwt({ token, account, user }) {
      // İlk login’de accessToken ve rolü ekle
      if (account) {
        token.accessToken = account.access_token;
        // Eğer user objesinde roles varsa, token’a role olarak ekle
        if (user && "roles" in user && Array.isArray((user as any).roles)) {
          token.role = (user as any).roles[0];
        } else {
          token.role = "user"; // Default role
        }
      }
      return token;
    },

    // Session objesine ek bilgiler ekleme
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.user.role = token.role as string | undefined;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
