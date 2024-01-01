"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const AddSports = () => {
    const router = useRouter();
    const [sportsId, setSportsId] = useState<string>("");
    const [sportsName, setSportsName] = useState<string>("");

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setSportsName(e.target.value);
    };
    const handleId = (e: ChangeEvent<HTMLInputElement>) => {
        setSportsId(e.target.value);
    };

    const handleSubmit = async () => {
        if (sportsName.trim() !== "") {
            try {
                const res = await fetch("/api/sports/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: sportsId, name: sportsName }),
                });

                if (res.status == 200) {
                    router.refresh();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <div className="mt-4 space-y-2">
                <input
                    value={sportsName}
                    onChange={handleName}
                    type="text"
                    className="w-full py-2 px-4 bordr border-gray-300 rounded-md outline-none ring focus:border-blue-300"
                    name="name"
                    placeholder="종목 한글 이름"
                />
                <input
                    value={sportsId}
                    onChange={handleId}
                    type="text"
                    className="w-full py-2 px-4 bordr border-gray-300 rounded-md outline-none ring focus:border-blue-300"
                    name="id"
                    placeholder="sportsId"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2 disabled:bg-gray-400"
                >
                    종목 추가
                </button>
            </div>
        </div>
    );
};

export default AddSports;
