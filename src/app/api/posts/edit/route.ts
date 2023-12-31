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

        let { id, title, content, sportsId, imgUrl } = await req.json();

        const newPost = await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                title,
                content,
                imgUrl: imgUrl,
                sportsId: sportsId,
                authorEmail: user.email,
            },
        });

        return NextResponse.json({ newPost }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}
