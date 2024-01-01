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

        const count = await prisma.profile.count({
            where: {
                userId: user?.id,
            },
        });

        const {
            profileImageUrl,
            link1,
            nickname,
            address,
            description,
            sportsId: sportsId,
        } = await req.json();

        console.log(
            `profile - ${profileImageUrl}, ${link1}, ${nickname}, ${address}, ${description} ${sportsId}`
        );

        if (count == 0) {
            const res = await prisma.profile.create({
                data: {
                    profileImageUrl,
                    link1,
                    nickname,
                    address,
                    description,
                    sportsId: sportsId,
                    userId: user?.id,
                },
            });

            const ures = await prisma.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    name: nickname,
                },
            });

            return NextResponse.json({ res }, { status: 200 });
        } else {
            const res = await prisma.profile.update({
                where: {
                    userId: user?.id,
                },
                data: {
                    profileImageUrl,
                    link1,
                    nickname,
                    address,
                    description,
                    sportsId: sportsId,
                },
            });

            const ures = await prisma.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    name: nickname,
                },
            });
            return NextResponse.json({ res }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}
