"use client";
import { BlogDetailPageProps } from "@/app/blogs/[id]/page";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

const DeleteButton: FC<BlogDetailPageProps> = ({ params }) => {
    const router = useRouter();

    const deleteClick = async () => {
        try {
            const response = await fetch(`/api/posts/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId: params.id }),
            });

            const res = await response.json();

            console.log(res);
            if (res.status == 200) {
                router.push("/");
            }
        } catch (error) {}
    };

    return (
        <div>
            <div className="btn btn-sm" onClick={deleteClick}>
                삭제
            </div>
        </div>
    );
};

export default DeleteButton;
