"use client";
import React, { FC } from "react";

export interface LikeCommentUpButtonProps {
    action: () => {};
}

const LikeCommentUpButton: FC<LikeCommentUpButtonProps> = async ({
    action,
}) => {
    return (
        <div>
            <div className="btn" onClick={action}>
                좋아요!
            </div>
        </div>
    );
};

export default LikeCommentUpButton;
