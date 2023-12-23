import React from "react";
import { posts } from "../data/posts";
import Link from "next/link";
import prisma from "@/lib/db";
import dayjs from "dayjs";

const MostLikedBlogs = async () => {
    const posts = await prisma.post.findMany({
        take: 10,
        orderBy: {
            LikedPosts: {
                _count: "desc",
            },
        },
        include: {
            author: true,
        },
    });

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-4 bg-blue-100 p-4 rounded">
                인기글
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/blogs/${post.id}`}
                        className="bg-white p-4 rounded-md shadow"
                    >
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <div className="flex-col text-xs">
                            <p>질문자: {post.author?.name}</p>
                            <p>
                                작성일:{" "}
                                {dayjs(post.createdAt).format("YYYY-MM-DD")}
                            </p>
                            <p>조회수: {post.viewCount ?? 0}회</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MostLikedBlogs;
