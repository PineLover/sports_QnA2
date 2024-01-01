import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await getCurrentUser();

    try {
        if (!user?.email) {
            return NextResponse.json(
                { message: "Not Authenticated!" },
                { status: 401 }
            );
        }

        const { postId } = await req.json();

        const thePost = await prisma.post.findFirst({
            where: {
                id: postId,
            },
        });

        if (thePost?.authorEmail == user.email) {
            await prisma.post.delete({
                where: {
                    id: postId,
                },
            });
            return NextResponse.json({ status: 200 });
        } else {
            return NextResponse.json({ status: 403 });
        }
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}
