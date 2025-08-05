// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/models/User";
// import connect from "@/utils/db";
// import bcrypt from "bcryptjs";

// export const authOptions = NextAuth({
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       async authorize(credentials) {
//         await connect();

//         try {
//           const user = await User.findOne({ email: credentials.email });

//           if (!user) throw new Error("User not found!");

//           const isPasswordCorrect = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );

//           if (!isPasswordCorrect) throw new Error("Wrong Credentials!");

//           return {
//             id: user._id,
//             name: user.username,
//             email: user.email,
//             image: user.image || null,
//           };
//         } catch (err) {
//           throw new Error(err.message);
//         }
//       },
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.picture = user.image || null;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.image = token.picture;
//       }
//       return session;
//     },
//   },

//   pages: {
//     error: "/dashboard/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
// });

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: "/dashboard/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
