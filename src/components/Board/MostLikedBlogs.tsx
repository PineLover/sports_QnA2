"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { SportsSelectedPageProps } from "@/app/sports/[id]/page";
import { LocalStorageIds } from "@/lib/localStorageIds";
import { Posts } from "./AllBlogs";

const MostLikedBlogs: FC<SportsSelectedPageProps> = ({ params }) => {
    const [posts, setPosts] = useState<Posts[]>([]);

    const getBlogs = async (sportsId: string) => {
        try {
            const response = await fetch(
                `api/blogs/famous?q=${params.q}&sportsId=${sportsId}`
            );
            const result = await response.json();
            setPosts(result.posts);
        } catch (error) {}
    };

    useEffect(() => {
        const id = localStorage.getItem(LocalStorageIds.sportsId) as string;

        if (id == null) {
            localStorage.setItem(LocalStorageIds.sportsId, "all");
        }

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
                        className="flex bg-white p-4 rounded-md shadow"
                    >
                        <div className="flex-col w-full">
                            <h2 className="text-xl font-bold ">
                                {post.title}
                            </h2>
                            <div className="flex w-full">
                                <div className="text-xs">
                                    {post?.sports?.name}
                                </div>
                                <div className="grow"></div>
                                <div className="text-xs flex space-x-2">
                                    <p>by: {post.author?.name}</p>
                                    <p>
                                        {dayjs(post.createdAt).format(
                                            "YYYY.MM.DD"
                                        )}
                                    </p>
                                    <p>조회{post.viewCount ?? 0}회</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MostLikedBlogs;
