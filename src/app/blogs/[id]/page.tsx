import Comments from "@/components/Comment/comments";
import FormComments from "@/components/Forms/form-comments";
import prisma from "@/lib/db";
import dayjs from "dayjs";
import React, { FC } from "react";
import LikeDisLikePost from "@/components/Post/LikeDisLikePost";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import DeleteButton from "@/components/Post/DeleteButton";

export interface BlogDetailPageProps {
    params: {
        id: string;
    };
}

const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
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

    await prisma.post.update({
        where: { id: params.id },
        data: { viewCount: { increment: 1 } },
    });

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold">{post?.title}</h1>
            <div className="flex justify-end my-2">
                <div className="flex-col">
                    {post?.author?.email == user?.email ? (
                        <div className="flex space-x-2 mb-2">
                            <Link
                                className="btn btn-sm"
                                href={`/post/edit/${post?.id}`}
                            >
                                수정하기
                            </Link>
                            <DeleteButton
                                params={{
                                    id: params.id,
                                }}
                            />
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div className="">종목: {post?.sports?.name}</div>
                    <div className="">질문자: {post?.author?.name}</div>
                    <div className="">
                        작성일:{" "}
                        {dayjs(post?.createdAt).format("YYYY.MM.DD hh:m")}
                    </div>
                    <div className="">조회수: {post?.viewCount ?? 0}</div>
                </div>
            </div>

            <div className="mt-4 bg-white rounded px-0 py-4">
                {/* {post?.content} */}
                <div
                    dangerouslySetInnerHTML={{ __html: post?.content ?? "" }}
                />
            </div>
            <LikeDisLikePost postId={params.id} />
            <Comments postId={params.id} />
            <FormComments postId={params.id} />
        </div>
    );
};

export default BlogDetailPage;
