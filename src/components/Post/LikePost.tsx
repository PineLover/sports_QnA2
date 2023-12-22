import React from "react";

const LikePost = () => {
    return (
        <div className="flex justify-center space-x-6">
            <div className="btn">좋아요! {}개</div>
            <div className="btn">별로에요!</div>
        </div>
    );
};

export default LikePost;
