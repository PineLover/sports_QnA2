import Link from "next/link";
import React from "react";
import SignInButton from "./signInButton";
import { getCurrentUser } from "@/lib/session";
import LogOutButton from "./LogOutButton";
import { selectedSportName } from "../SportsSection";

const header = async () => {
    const user = await getCurrentUser();

    return (
        <header className="bg-indigo-500 p-4">
            <nav className="flex justify-between items-center max-w-4xl mx-auto">
                <Link href="/" className="text-white text-2xl font-bold">
                    운동 고수들이 모인곳 - 운고
                </Link>

                <div className="">{selectedSportName}</div>

                <ul className="flex space-x-5">
                    <div>
                        <Link
                            href="/question"
                            className="text-white hover:underline"
                        >
                            질문작성
                        </Link>
                    </div>
                    <div>
                        <Link
                            href="/blogs"
                            className="text-white hover:underline"
                        >
                            질문목록
                        </Link>
                    </div>

                    {user?.name ? (
                        <div className="space-x-3">
                            <Link
                                href="/profile"
                                className="text-white hover:underline"
                            >
                                프로필
                            </Link>
                            <LogOutButton />
                        </div>
                    ) : (
                        <div>
                            <Link
                                href="/api/auth/signin"
                                className="text-white hover:underline"
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
