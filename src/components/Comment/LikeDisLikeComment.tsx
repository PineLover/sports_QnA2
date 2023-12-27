"use client";

import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface LikeCommentProps {
    comment_id: string;
}

const LikeDisLikeComment: FC<LikeCommentProps> = ({ comment_id }) => {
    const router = useRouter();
    const [likedCount, setLikedCount] = useState("0");
    const [dislikedCount, setDisLikedCount] = useState("0");

    const getLikeCount = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/comments/getLikeCount?comment_id=${comment_id}`
            );
            const result = await response.json();

            setLikedCount(result.likedCount);
        } catch (error) {}
    };

    const getDisLikeCount = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/comments/getDisLikeCount?comment_id=${comment_id}`
            );
            const result = await response.json();
            setDisLikedCount(result.disLikedCount);
        } catch (error) {}
    };

    const LikeCommentAction = async () => {
        try {
            const likedComment = await axios.post(
                "/api/comments/likeComments",
                {
                    comment_id,
                }
            );

            if (likedComment.status == 200) {
                router.refresh();
            }
        } catch (error) {}
    };

    const DisLikeCommentAction = async () => {
        try {
            const disLikedComment = await axios.post(
                "/api/comments/disLikeComments",
                {
                    comment_id,
                }
            );

            if (disLikedComment.status == 200) {
                router.refresh();
            }
        } catch (error) {}
    };

    useEffect(() => {
        getLikeCount();
        getDisLikeCount();
    }, []);

    return (
        <div className="flex justify-center space-x-6">
            <div className="btn" onClick={LikeCommentAction}>
                좋아요! {likedCount}개
            </div>
            <div className="btn" onClick={DisLikeCommentAction}>
                틀렸어요! {dislikedCount}개
            </div>
        </div>
    );
};

export default LikeDisLikeComment;
