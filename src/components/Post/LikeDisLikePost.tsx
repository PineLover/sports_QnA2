"use client";

import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface LikePostsProps {
    postId: string;
}

const LikeDisLikePost: FC<LikePostsProps> = ({ postId }) => {
    const router = useRouter();
    const [likedCount, setLikedCount] = useState("0");
    const [dislikedCount, setDisLikedCount] = useState("0");

    const getLikeCount = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/posts/getLikeCount?post_id=${postId}`
            );
            const result = await response.json();

            setLikedCount(result.count);
        } catch (error) {}
    };

    const getDisLikeCount = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/posts/getDisLikeCount?post_id=${postId}`
            );
            const result = await response.json();

            setDisLikedCount(result.count);
        } catch (error) {}
    };

    const LikeAction = async () => {
        try {
            const res = await axios.post("/api/posts/like", {
                postId,
            });

            if (res.status == 200) {
                router.refresh();
            }
        } catch (error) {}
    };

    const DisLikeAction = async () => {
        try {
            const res = await axios.post("/api/posts/disLike", {
                postId,
            });

            if (res.status == 200) {
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
            <div className="btn" onClick={LikeAction}>
                좋아요! {likedCount}개
            </div>
            <div className="btn" onClick={DisLikeAction}>
                틀렸어요! {dislikedCount}개
            </div>
        </div>
    );
};

export default LikeDisLikePost;
