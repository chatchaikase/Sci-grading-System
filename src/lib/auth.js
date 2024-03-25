import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import axios from "axios";
import GitHub from "next-auth/providers/github";
import { authConfig } from "./auth.config";
const path = process.env.LocalhostDOTNET;

const login = async (credentials) => {
  try {
    const { username, password } = credentials;
    const user = await axios.get(`${path}/api/User/GetUserByUsername/${username}`, 
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });

    if (!user) {
      throw new Error("Wrong credentials!");
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.data.password)
    if (!isPasswordCorrect) {
        throw new Error("Wrong credentials!");
      }

    return user.data;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to Login");
  }
};



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
  } = NextAuth({
    ...authConfig,
    providers: [
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      CredentialsProvider({
        async authorize(credentials){
          try {
            const user = await login(credentials);
            return user;
          } catch (error) {
            return null;
          }
        }
      })
    ],
    ...authConfig.callbacks,
  }
  );
  