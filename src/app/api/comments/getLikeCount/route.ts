import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const comment_id = req.nextUrl.searchParams.get("comment_id");
        if (comment_id) {
            const count = await prisma.likedComments.count({
                where: {
                    commentId: comment_id,
                },
            });

            return NextResponse.json({ likedCount: count }, { status: 200 });
        } else {
            return NextResponse.json({ likedCount: 0 }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}
