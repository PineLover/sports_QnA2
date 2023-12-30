"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { SportsSelectedPageProps } from "@/app/sports/[id]/page";
import { local_url } from "@/lib/url";
import { LocalStorageIds } from "@/lib/localStorageIds";
import { Posts } from "./AllBlogs";

const MostLikedBlogs: FC<SportsSelectedPageProps> = ({ params }) => {
    const [posts, setPosts] = useState<Posts[]>([]);

    const getBlogs = async (sportsId: string) => {
        try {
            const response = await fetch(
                `${local_url}/api/blogs/famous?q=${params.q}&sportsId=${sportsId}`
            );
            const result = await response.json();
            setPosts(result.posts);
        } catch (error) {}
    };

    useEffect(() => {
        const id = localStorage.getItem(LocalStorageIds.sportsId) as string;
        console.log(id);
        getBlogs(id);
    }, []);

    return (
        <div className="">
            <hr className="mb-1" />
            <h1 className="font-NotoSansKR text-lg mb-2 p-4 rounded">
                인기질문
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
                            <div className="">종목: {post?.sports?.name}</div>
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
