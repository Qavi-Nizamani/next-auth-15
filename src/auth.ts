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
        let user = null;

        // Cast credentials to the expected type
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(password);

        // logic to verify if the user exists
        // user = await getUserFromDb(email, pwHash);
        user = await getUserFromDb(email, password);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});

const saltAndHashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const getUserFromDb = async (email: string, pwHash: string) => {
  // logic to get user from database using email and hashed password
  // This is a mock implementation. Replace it with actual database logic.
  const mockUserDatabase = [
    { email: "test@example.com", passwordHash: "hashedpassword123" },
  ];

  const user = mockUserDatabase.find(
    (user) => user.email === email && user.passwordHash === pwHash
  );

  if (user) {
    return {
      id: "1",
      name: "Test User",
      email: user.email,
    };
  }

  return null;
};
