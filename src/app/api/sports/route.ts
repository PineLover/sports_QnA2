import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const res = await prisma.sports.findMany({
            orderBy: {
                Post: {
                    _count: "desc",
                },
            },
            include: {
                _count: {
                    select: {
                        Post: true,
                    },
                },
            },
        });

        return NextResponse.json({ sports: res }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}
