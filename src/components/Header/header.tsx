import Link from "next/link";
import React from "react";
import { getCurrentUser } from "@/lib/session";
import LogOutButton from "./LogOutButton";
import { FcSportsMode } from "react-icons/fc";
import { FcQuestions } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcGoogle } from "react-icons/fc";
import SearchBar from "./searchBar";

const header = async () => {
    const user = await getCurrentUser();

    return (
        <header className="bg-white p-4">
            <nav className="flex items-center px-5">
                <FcSportsMode className="" />
                <Link
                    href="/"
                    className="font-NotoSansKR text-black text-2xl font-normal"
                >
                    sportsforlife
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
                            글작성
                        </Link>
                    </div>

                    {user?.name ? (
                        <div className="flex space-x-5">
                            <div className="flex items-center">
                                <FcBusinessman />
                                <Link
                                    href="/profile"
                                    className="text-black hover:underline"
                                >
                                    프로필
                                </Link>
                            </div>
                            <LogOutButton />
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <FcGoogle />
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
