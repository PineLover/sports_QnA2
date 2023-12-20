"use client";
import { signOut } from "next-auth/react";
import React from "react";

const LogOutButton = () => {
    return (
        <button
            onClick={() => signOut()}
            className="text-white hover:underline"
        >
            Logout
        </button>
    );
};

export default LogOutButton;
