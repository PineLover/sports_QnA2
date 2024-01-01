import { BlogDetailPageProps } from "@/app/blogs/[id]/page";
import FormEditPost from "@/components/Forms/form-edit-post";
import LoginRequire from "@/components/LoginRequire";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { FC } from "react";

const Question: FC<BlogDetailPageProps> = async ({ params }) => {
    const user = await getCurrentUser();
    const post = await prisma.post.findFirst({
        where: {
            id: params.id,
        },
        include: {
            sports: true,
            author: true,
        },
    });

    return (
        <main className="w-3/4 mx-auto my-5">
            {user && post ? (
                <FormEditPost post={post} />
            ) : (
                <div className="">
                    <LoginRequire />
                </div>
            )}
        </main>
    );
};

export default Question;
