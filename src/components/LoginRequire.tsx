import Link from "next/link";
import React from "react";

const LoginRequire = () => {
    return (
        <div>
            <div className="hero bg-slate-100 rounded">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-2xl font-bold">
                            로그인이 필요한 서비스입니다.
                        </h1>
                        <p className="py-6">생활체육 정보 사이트.</p>
                        <Link
                            href="/api/auth/signin"
                            className="btn btn-wide bg-blue-50 font-bold"
                        >
                            로그인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRequire;
