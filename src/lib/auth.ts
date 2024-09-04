import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse, } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import { Adapter } from "next-auth/adapters"
import { login } from "@/db"
import { PrismaAdapter } from "@auth/prisma-adapter"

import Credentials from "next-auth/providers/credentials"
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/db/prisma.index'


export const config = {
  pages: {
    signIn: '/user',
    signOut: '/user',
    error: '/user',
    verifyRequest: '/auth/home',
    newUser: '/auth/home',
  },

  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt'
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },

      async authorize(credentials, req) {
        
        const authLogin = await login({
          email: credentials?.email || '',
          password: credentials?.password || ''
        })

        if (authLogin instanceof Error) {
          return null
        }

        return authLogin
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',

    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),

    EmailProvider({

      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)

      // sendVerificationRequest({
      //   identifier: email,
      //   url,
      //   provider: { server, from },
      // }) {
      //   /* your function */
      // },

      // async generateVerificationToken() {
      //   return "ABC123"
      // }
    }),
  ],

  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if(!profile?.email){
  //       throw new Error('No Profile')
  //     }

  //     const passwordHash = CriptPassword('User1234')

  //     await prisma.user.upsert({
  //       where: {
  //         email: profile.email
  //       },
  //       create: {
  //         email: profile.email,
  //         name: profile.name,
  //         password: passwordHash
  //       },
  //       update:{
  //         name: profile.name
  //       }
  //     })

  //     return true
  //   },
  // }
} satisfies NextAuthOptions

// Use it in server contexts
export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  await getServerSession(...args, config)
}

