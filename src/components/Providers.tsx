"use client";
import { SportsSelectContext } from "@/lib/context";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Providers = (props: Props) => {
    return (
        <SessionProvider>
                {props.children}
        </SessionProvider>
    );
};

export default Providers;
