"use client";
import { competition_squash_url } from "@/lib/url";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface WinResponse {
    q: string;
    page: number;
    count: number;
    win_datas: WinData[];
}

export interface WinData {
    summary: string;
    name: string;
    win_list: WinList[];
}

export interface WinList {
    competition: Competition;
    class_degree: string;
    rank: number;
}

export interface Competition {
    id: string;
    competition_name: string;
    start_date: string;
    center_name: string;
    host: string;
}

const SquashRanks = () => {
    let q = "";
    let page = 1;

    const [res, setRes] = useState<WinResponse>();

    const getRanks = async () => {
        try {
            const response = await fetch(
                `${competition_squash_url}/individual_history_list_api/?page=${page}`
            );
            const result = await response.json();
            setRes(result);
        } catch (error) {}
    };

    useEffect(() => {
        getRanks();
    });

    return (
        <div className="space-y-3">
            {res ? <div></div> : <div>loading...</div>}
            {res?.win_datas.map((winner) => (
                <div key={winner.name} className="flex-col">
                    <div className="font-bold">{winner.name}</div>
                    {winner.summary} - {winner.win_list.length}개
                    <div>
                        {winner.win_list.map((elem) => (
                            <div key={elem.competition.id} className="flex-col">
                                <Link
                                    href={`/ranks/competition/${elem.competition.id}`}
                                >
                                    {elem.competition.competition_name}
                                </Link>
                                {elem.class_degree} - {elem.rank}위
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SquashRanks;
