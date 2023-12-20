import Link from "next/link";
import React from "react";
import SignInButton from "./signInButton";
import { getCurrentUser } from "@/lib/session";
import LogOutButton from "./LogOutButton";

const header = async () => {
    const user = await getCurrentUser();

    return (
        <header className="bg-indigo-500 p-4">
            <nav className="flex justify-between items-center max-w-4xl mx-auto">
                <Link href="/" className="text-white text-2xl font-bold">
                    운동 고수들이 모인곳 - 운고
                </Link>

                <ul className="flex space-x-4">
                    <li>
                        <Link
                            href="/blogs"
                            className="text-white hover:underline"
                        >
                            전체글
                        </Link>
                    </li>
                    {user?.name ? (
                        <LogOutButton />
                    ) : (
                        <li>
                            <Link
                                href="/api/auth/signin"
                                className="text-white hover:underline"
                            >
                                로그인
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default header;
