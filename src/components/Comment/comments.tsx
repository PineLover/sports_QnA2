import prisma from "@/lib/db";
import { format } from "date-fns/format";
import React, { FC } from "react";
import { ko } from "date-fns/locale";
import dayjs from "dayjs";
import LikeDisLikeComment from "./LikeDisLikeComment";

interface CommentsProps {
    postId: string;
}

const Comments: FC<CommentsProps> = async ({ postId }) => {
    const comments = await prisma.comment.findMany({
        where: {
            postId: postId,
        },
        include: {
            author: true,
        },
    });

    return (
        <div className="mt-8 px-1 py-2">
            <h2 className="text-xl font-bold">댓글 {comments.length}개</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="mb-4">
                        <div className="flex items-center mb-2">
                            <div className="text-blue-500 font-bold mr-2">
                                {comment.author?.name}
                            </div>
                            <div className="text-gray-500">
                                {dayjs(comment.createdAt).format(
                                    "YYYY.MM.DD hh:m"
                                )}
                            </div>
                            <div className="ml-auto">
                                <LikeDisLikeComment comment_id={comment.id} />
                            </div>
                        </div>
                        <p>{comment.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
