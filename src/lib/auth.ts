import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./db";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            // authorization: {
            //     params: {
            //         response_type: "code",
            //         redirect_uri:
            //             "http:///www.sportsforlife.co.kr/api/auth/signin",
            //         scope: "https://www.googleapis.com/auth/signin",
            //     },
            // },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
