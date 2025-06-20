import { Session, DefaultSession, JWT } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      role?: string; 
      roles?: string[];
    } & DefaultSession['user'];
  }

  interface JWT {
    accessToken?: string;
    idToken?: string;
    roles?: string[];
    role?: string; 
  }
}