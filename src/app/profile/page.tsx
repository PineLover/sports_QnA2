import prisma from "@/lib/db";
import { getCurrentProfile, getCurrentUser } from "@/lib/session";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default async function Profile() {
    const user = await getCurrentUser();
    const profile = await getCurrentProfile();

    const posts = await prisma.post.findMany({
        take: 10,
        where: { authorEmail: user?.email },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            author: true,
            sports: true,
        },
    });

    return (
        <main className="flex-col  justify-items-center p-5">
            <div className="m-4 space-y-5">
                {user?.email ? (
                    <Link className="btn" href={"/profile/edit"}>
                        프로필 수정
                    </Link>
                ) : (
                    <div></div>
                )}
                {profile?.profileImageUrl ? (
                    <Image
                        src={profile?.profileImageUrl}
                        width={150}
                        height={150}
                        alt="프로필 이미지"
                    />
                ) : (
                    <div></div>
                )}
                <h1 className="text-2xl font-bold">{profile?.nickname}</h1>
                <div className="flex flex-col">
                    <a className="link" href="">
                        {profile?.link1}
                    </a>
                </div>
                <div className="">주소: {profile?.address}</div>
                <div className="">종목: {profile?.sports?.name ?? "없음"}</div>
                <p className="">소개: {profile?.description}</p>

                <div className="">그동한 작성한 글 목록</div>
                <div className="space-y-1">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blogs/${post.id}`}
                            className="flex bg-white p-4 rounded-md shadow"
                        >
                            <div className="flex-col">
                                <h2 className="text-xl font-bold">
                                    {post.title}
                                </h2>
                                <div className="">
                                    종목: {post?.sports?.name}
                                </div>
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
        </main>
    );
}
