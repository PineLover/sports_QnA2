"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import dayjs from "dayjs";
import { SportsSelectedPageProps } from "@/app/sports/[id]/page";
import { Prisma } from "@prisma/client";
import { local_url } from "@/lib/url";
import { LocalStorageIds } from "@/lib/localStorageIds";

export type Posts = Prisma.PostGetPayload<{
    include: {
        author: true;
        sports: true;
    };
}>;

const AllBlogs: FC<SportsSelectedPageProps> = ({ params }) => {
    const [posts, setPosts] = useState<Posts[]>([]);

    const getBlogs = async (sportsId: string) => {
        try {
            const response = await fetch(
                `${local_url}/api/blogs?q=${params.q}&sportsId=${sportsId}`
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
                전체 질문
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/blogs/${post.id}`}
                        className="flex bg-white p-4 rounded-md shadow"
                    >
                        <div className="flex-col">
                            <h2 className="text-xl font-bold">{post.title}</h2>
                            <div className="">종목: {post?.sports?.name}</div>
                        </div>
                        <div className="grow"></div>
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

export default AllBlogs;
