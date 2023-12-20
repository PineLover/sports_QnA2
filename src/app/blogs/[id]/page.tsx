import Comments from "@/components/comments";
import FormComments from "@/components/form-comments";
import prisma from "@/lib/db";
import { format } from "date-fns";
import dayjs from "dayjs";
import React, { FC } from "react";

interface BlogDetailPageProps {
    params: {
        id: string;
    };
}

const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
    const post = await prisma.post.findFirst({
        where: {
            id: params.id,
        },
        include: {
            author: true,
        },
    });

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold">{post?.title}</h1>
            <div className="flex justify-end">
                <div className="flex-col">
                    <div className="">질문자: {post?.author?.name}</div>
                    <div className="">
                        작성일:{" "}
                        {dayjs(post?.createdAt).format("YYYY.MM.DD hh:m")}
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-white rounded px-0 py-4">
                {post?.content}
            </div>

            <Comments postId={params.id} />
            <FormComments postId={params.id} />
        </div>
    );
};

export default BlogDetailPage;
