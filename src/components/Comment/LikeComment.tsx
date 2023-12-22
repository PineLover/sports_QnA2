"use client";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import React, { FC } from "react";
import LikeCommentUpButton from "./LikeCommentUpButton";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface LikeCommentProps {
    comment_id: string;
}

const LikeComment: FC<LikeCommentProps> = async ({ comment_id }) => {
    const router = useRouter();
    // const likedCount = await prisma.likedComments.count({
    //     where: { id: comment_id },
    // });
    const likedCount = 0;

    const handleSubmitComment = async () => {
        try {
            const likedComment = await axios.post("/api/comments/likeComments", {
                comment_id,
            });

            console.log(likedComment);

            if (likedComment.status == 200) {
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(likedCount);

    return (
        <div className="flex justify-center space-x-6">
            <div className="btn" onClick={handleSubmitComment}>
                좋아요! {likedCount}개
            </div>
            {/* <LikeCommentUpButton action={like} /> */}
            <div>좋아요! {likedCount}개</div>
            <div className="btn">별로에요!</div>
        </div>
    );
};

export default LikeComment;
