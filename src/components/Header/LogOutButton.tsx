"use client";
import { signOut } from "next-auth/react";
import React from "react";

const LogOutButton = () => {
    return (
        <button
            onClick={() => signOut()}
            className="text-black hover:underline"
        >
            로그아웃
        </button>
    );
};

export default LogOutButton;
