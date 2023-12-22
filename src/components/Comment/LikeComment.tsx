"use client";

import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import React, { FC, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface LikeCommentProps {
    comment_id: string;
}

const LikeComment: FC<LikeCommentProps> = ({ comment_id }) => {
    const router = useRouter();
    const [likedCount, setLikedCount] = useState("0");

    const getLikeCount = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/comments/getLikeCount?comment_id=${comment_id}`
            );
            const result = await response.json();

            setLikedCount(result.likedCount);
        } catch (error) {}
    };

    const handleSubmitComment = async () => {
        try {
            const likedComment = await axios.post(
                "/api/comments/likeComments",
                {
                    comment_id,
                }
            );

            console.log(likedComment);

            if (likedComment.status == 200) {
                router.refresh();
            }
        } catch (error) {}
    };

    getLikeCount();

    return (
        <div className="flex justify-center space-x-6">
            <div className="btn" onClick={handleSubmitComment}>
                좋아요! {likedCount}개
            </div>
            <div className="btn">별로에요!</div>
        </div>
    );
};

export default LikeComment;
