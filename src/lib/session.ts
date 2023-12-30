import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "./db";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);

    if (session?.user?.email) {
        const user = prisma.user.findUnique({
            where: { email: session?.user?.email },
        });

        return user;
    }

    return null;
}

export async function getCurrentProfile() {
    const session = await getServerSession(authOptions);

    if (session?.user?.email) {
        const user = await getCurrentUser();
        const profile = prisma.profile.findUnique({
            where: { userId: user?.id },
            include: {
                user: true,
                sports: true,
            },
        });

        return profile;
    }

    return null;
}
