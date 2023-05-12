import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../../lib/mongoose";
import { compare } from "bcryptjs";
import { getSession } from "next-auth/react";

require("dotenv").config();

// const dbPromise = connectToDatabase();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("entered auth");
        const db = await connectToDatabase();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          return null;
        }

        const pwValid = await compare(credentials.password, user.password);

        if (!pwValid) {
          return null;
        }

        // Return the user object without the password field
        return {
          id: user._id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Only add user data to the token if it doesn't already exist
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (token) {
        session.userId = token.userId;
        session.email = token.email;
        session.role = token.role;
      }
      console.log(session);
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  database: process.env.MONGODB_URI,

  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    encryption: true,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    encryptionAlgorithm: "HS256",
  },

  async initialize(configOptions) {
    await dbPromise;
    return await super.initialize(configOptions);
  },

  async session(configOptions, session) {
    await dbPromise;
    const result = await super.session(configOptions, session);
    return result;
  },
});
