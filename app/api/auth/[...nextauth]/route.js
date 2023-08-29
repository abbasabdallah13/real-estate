import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";


import User from "@/models/User.js"
import { connectToDb } from "@/utils/database"

const handler = NextAuth ({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        httpOptions: {
          timeout: 40000,
        },
      }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      })
    // ...add more providers here
  ],
  callbacks: {
    async session({ session }){
        const sessionUser = await User.findOne({
            email: session.user.email
        })
        session.user.id = sessionUser._id.toString();
        return session

    },
    async signIn({ profile }){
        try {
            // check if a user already exists
            await connectToDb();
            const userExists = await User.findOne({
                email: profile.email
            });

            // if user doesn't exists create a new user
            if(!userExists) {
                await User.create({
                    email: profile.email,
                    username: `${profile.name.replace(" ","").toLowerCase()}${profile.sub}`,
                    image: profile.picture,
                })
            }

            return true;
        } catch (error) {
            console.log(error.message)
            return false;
        }
    }
    }
})

export { handler as GET, handler as POST }