import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "./db";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);

    if (session?.user?.email) {
        const user = prisma.user.findUnique({
            where: { email: session?.user?.email },
            include: {
                sports: true,
            },
        });

        return user;
    }

    return null;
}
