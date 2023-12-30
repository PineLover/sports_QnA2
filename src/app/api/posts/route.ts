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

        const { title, content, sportsId } = await req.json();

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
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
