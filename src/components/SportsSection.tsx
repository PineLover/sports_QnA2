"use client";
import { Sports } from "@/app/sports/page";
import prisma from "@/lib/db";
import { local_url } from "@/lib/url";
import Link from "next/link";
import React, { useState } from "react";

export var selectedSport = "";

const SportsSection = () => {
    const [sports, setSports] = useState<Sports[]>([]);

    const getSports = async () => {
        try {
            const response = await fetch(`${local_url}/api/sports`);
            const result = await response.json();
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
                    <Link key={sport.id} className="btn" href={""}>
                        {sport.name} - {sport._count.Post}개
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SportsSection;
