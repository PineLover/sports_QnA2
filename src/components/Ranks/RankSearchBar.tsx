"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

const RankSearchBar = () => {
    const [query, setQuery] = useState<string>("");

    const handleQueryChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLElement>
    ) => {
        e.preventDefault();
        const elem = e.target as HTMLInputElement;

        const queryEncode = encodeURIComponent(elem.value);
        setQuery(elem.value);
    };

    return (
        <div className="max-w-xs">
            <form className="join">
                <input
                    className="input input-bordered join-item"
                    type="text"
                    placeholder="선수 이름 검색"
                    onChange={handleQueryChange}
                />
                <Link
                    className="btn join-item rounded-r-full"
                    href={`/ranks/1/${query}`}
                >
                    검색
                </Link>
            </form>
        </div>
    );
};

export default RankSearchBar;
