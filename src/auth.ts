import { connectDB } from "@/lib/mongodb";
import User from "@/models/User.model";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        await connectDB();

        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) {
          return null;
        }

        if (typeof credentials?.password !== "string") {
          return null;
        }

        console.log(credentials.password, user.password);

        const passwordMatch = bcrypt.compareSync(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
