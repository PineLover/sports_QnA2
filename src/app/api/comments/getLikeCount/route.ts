import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = await getCurrentUser();

    try {
        if (!user?.email) {
            return NextResponse.json(
                { message: "Not Authenticated!" },
                { status: 401 }
            );
        }

        const { comment_id } = await req.json();

        const likedComment = await prisma.likedComments.create({
            data: {
                commentId: comment_id,
                personLikedEmail: user?.email,
            },
        });

        console.log(likedComment);

        const updatedComment = await prisma.comment.update({
            where: { id: comment_id },
            data: {
                LikedComments: {
                    create: [likedComment],
                },
            },
        });

        return NextResponse.json({ updatedComment }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}
