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

        let check_existence = await prisma.disLikedComments.count({
            where: {
                commentId: comment_id,
                personDisLikedEmail: user?.email,
            },
        });

        if (check_existence > 0) {
            return NextResponse.json(1, { status: 200 });
        }

        await prisma.disLikedComments.create({
            data: {
                commentId: comment_id,
                personDisLikedEmail: user?.email,
            },
        });

        const count = await prisma.disLikedComments.count({
            where: {
                commentId: comment_id,
            },
        });

        return NextResponse.json({ count }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}
