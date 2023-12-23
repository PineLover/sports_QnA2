import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const postId = req.nextUrl.searchParams.get("post_id");
        if (postId) {
            const count = await prisma.disLikedPosts.count({
                where: {
                    postId: postId,
                },
            });

            return NextResponse.json({ count: count }, { status: 200 });
        } else {
            return NextResponse.json({ count: 0 }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}
