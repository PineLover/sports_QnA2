import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        let q = req.nextUrl.searchParams.get("q");
        let sportsId = req.nextUrl.searchParams.get("sportsId");
        let posts = null;

        if (q == undefined) {
            q = "";
        }

        if (sportsId == "all" || sportsId == null) {
            posts = await prisma.post.findMany({
                take: 10,
                where: {
                    title: {
                        contains: `${q}`,
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    author: true,
                    sports: true,
                },
            });
        } else {
            posts = await prisma.post.findMany({
                take: 10,
                where: {
                    title: {
                        contains: `${q}`,
                    },
                    sportsId: sportsId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    author: true,
                    sports: true,
                },
            });
        }

        return NextResponse.json({ posts: posts }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}
