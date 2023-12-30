import Link from "next/link";
import React from "react";
import SignInButton from "./signInButton";
import { getCurrentUser } from "@/lib/session";
import LogOutButton from "./LogOutButton";
import { FcSportsMode } from "react-icons/fc";
import { FcQuestions } from "react-icons/fc";
import SearchBar from "./searchBar";

const header = async () => {
    const user = await getCurrentUser();

    return (
        <header className="bg-white p-4">
            <nav className="flex items-center px-5">
                <FcSportsMode />
                <Link
                    href="/"
                    className="font-NotoSansKR text-black text-2xl font-normal"
                >
                    운동 고수들이 모인곳 - 운고
                </Link>
                <div className="grow"></div>

                <ul className="flex space-x-5">
                    <SearchBar />
                    <div className="flex items-center">
                        <FcQuestions />
                        <Link
                            href="/question"
                            className="font-NotoSansKR text-black hover:underline"
                        >
                            질문작성
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link
                            href="/blogs"
                            className="font-NotoSansKR text-black hover:underline"
                        >
                            질문목록
                        </Link>
                    </div>

                    {user?.name ? (
                        <div className="flex space-x-3 items-center">
                            <Link
                                href="/profile"
                                className="text-black hover:underline"
                            >
                                프로필
                            </Link>
                            <LogOutButton />
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <Link
                                href="/api/auth/signin"
                                className="text-black hover:underline"
                            >
                                로그인
                            </Link>
                        </div>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default header;
