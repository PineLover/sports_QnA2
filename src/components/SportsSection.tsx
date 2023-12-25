"use client";
import { local_url } from "@/lib/url";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import React, { ChangeEvent, useContext, useState } from "react";

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
    const getSports = async () => {
        try {
            const response = await fetch(`${local_url}/api/sports`);
            const result = await response.json();
            console.log(result.sports);
            setSports(result.sports);
        } catch (error) {}
    };

    getSports();

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-4 bg-green-100 p-4 rounded">
                관심 종목 선택
            </h1>
            <div className="flex space-x-5">
                {sports.map((sport) => (
                    <Link
                        key={sport.id}
                        className="btn"
                        href={`/sports/${sport.id}`}
                    >
                        {sport.name} - {sport._count.Post}개
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SportsSection;
