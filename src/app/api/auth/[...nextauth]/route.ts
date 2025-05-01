import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { z } from 'zod';
import clientPromise from '@/lib/mongodb';

// Schema for validating credentials
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/custom-signin',
    signOut: '/',
    error: '/auth/custom-signin',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Validate credentials
          const parsedCredentials = credentialsSchema.safeParse(credentials);
          if (!parsedCredentials.success) return null;

          // Connect to database
          await dbConnect();

          // Find user
          const user = await User.findOne({
            email: parsedCredentials.data.email,
          });

          if (!user) return null;

          // Check password
          const isValid = await user.comparePassword(parsedCredentials.data.password);
          if (!isValid) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          userId: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token?.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 