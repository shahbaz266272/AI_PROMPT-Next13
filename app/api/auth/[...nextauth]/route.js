import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    session.user.id = sessionUser._id.toString();

    return session;
  },

  async signIn({ profile }) {
    try {
      await connectToDB();
      //Check if user already exists
      const UserExists = await User.findOne({
        email: profile.email,
      });

      //Check if user not already exists
      if (!UserExists) {
        User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      return true;
    } catch (error) {
      console.log(err);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
