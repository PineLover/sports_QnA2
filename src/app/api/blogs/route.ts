import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const q = req.nextUrl.searchParams.get("q");
        const sportsId = req.nextUrl.searchParams.get("sportsId");

        const posts = await prisma.post.findMany({
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

        return NextResponse.json({ posts: posts }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}
