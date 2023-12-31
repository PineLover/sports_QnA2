"use client";
import { LocalStorageIds } from "@/lib/localStorageIds";
import { Prisma } from "@prisma/client";
import React, { useEffect, useState } from "react";

export type Sports = Prisma.SportsGetPayload<{
    include: {
        _count: {
            select: {
                Post: true;
            };
        };
    };
}>;

const SportsSection = () => {
    const [sports, setSports] = useState<Sports[]>([]);
    const [selectedSportsId, setSelectedSportsId] = useState<string>("");

    const getSports = async () => {
        try {
            const response = await fetch(`${process.env.local_url}/api/sports`);
            const result = await response.json();
            setSports(result.sports);
        } catch (error) {}
    };

    useEffect(() => {
        const id = localStorage.getItem(LocalStorageIds.sportsId) as string;
        setSelectedSportsId(id);

        console.log(id);

        getSports();
    }, []);

    return (
        <div className="">
            <hr className="mb-1" />
            <h1 className="font-NotoSansKR text-lg mb-2 px-4 py-2">
                관심 종목 선택
            </h1>
            <div className="flex space-x-5 px-4">
                {sports.map((sport) =>
                    selectedSportsId == sport.id ? (
                        <div
                            key={sport.id}
                            className="btn btn-sm bg-red-200"
                            onClick={() => {
                                localStorage.setItem(
                                    LocalStorageIds.sportsId,
                                    sport.id
                                );
                                setSelectedSportsId(sport.id);
                            }}
                        >
                            {sport.name} - {sport._count.Post}개
                        </div>
                    ) : (
                        <div
                            key={sport.id}
                            className="btn btn-sm bg-Slate-50"
                            onClick={() => {
                                localStorage.setItem(
                                    LocalStorageIds.sportsId,
                                    sport.id
                                );
                                setSelectedSportsId(sport.id);
                                location.reload();
                            }}
                        >
                            {sport.name} - {sport._count.Post}개
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default SportsSection;
