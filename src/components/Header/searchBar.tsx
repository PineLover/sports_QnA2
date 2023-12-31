"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";

const SearchBar = () => {
    const [query, setQuery] = useState<string>("");

    const handleQueryChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLElement>
    ) => {
        e.preventDefault();
        const elem = e.target as HTMLInputElement;

        setQuery(elem.value);
    };

    return (
        <div className="max-w-xs">
            <form className="join">
                <input
                    className="input input-bordered join-item"
                    type="text"
                    placeholder="글 검색"
                    onChange={handleQueryChange}
                />
                <Link
                    className="btn join-item rounded-r-full"
                    href={`/blogs/query/${query}`}
                >
                    검색
                </Link>
            </form>
        </div>
    );
};

export default SearchBar;
