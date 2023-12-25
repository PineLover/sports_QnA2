import React, { FC } from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import dayjs from "dayjs";
import { SportsSelectedPageProps } from "@/app/sports/[id]/page";

const AllBlogs: FC<SportsSelectedPageProps> = async ({ params }) => {
    const posts = await prisma.post.findMany({
        take: 10,
        where: {},
        orderBy: {
            createdAt: "desc",
        },
        include: {
            author: true,
            sports: true,
        },
    });

    console.log(`AllBlogs ${params.id}`);

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-4 bg-red-100 p-4 rounded">
                전체 질문
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

export default AllBlogs;
