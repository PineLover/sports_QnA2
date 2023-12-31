"use client";
import { competition_squash_url } from "@/lib/url";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

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

export interface SquashRanksProps {
    q: string;
    page: number;
}

const SquashRanks: FC<SquashRanksProps> = ({ q, page }) => {
    let [cur_page, setPage] = useState<number>(1);
    let [res, setRes] = useState<WinResponse>();

    const getRanks = async () => {
        try {
            const response = await fetch(
                `${competition_squash_url}/individual_history_list_api/?page=${cur_page}`
            );
            const result = await response.json();
            setRes(result);
        } catch (error) {}
    };

    useEffect(() => {
        setPage(page);
        getRanks();
    }, []);

    const onClickPrev = () => {
        if (cur_page) {
            if (cur_page > 1) {
                setRes(undefined);
                setPage(cur_page - 1);
                getRanks();
            }
        }
    };

    const onClickUp = () => {
        if (cur_page) {
            setRes(undefined);
            setPage(cur_page + 1);
            getRanks();
        }
    };

    return (
        <div>
            <div className="flex items-center space-x-2">
                <div>{cur_page} 페이지</div>
                <div className="btn btn-sm" onClick={onClickPrev}>
                    이전
                </div>
                <div className="btn btn-sm" onClick={onClickUp}>
                    이후
                </div>
            </div>
            {q ? <div>검색어 - {q}</div> : <div></div>}

            <div className="space-y-3">
                {res ? (
                    <div></div>
                ) : (
                    <div>
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                )}
                {res?.win_datas.map((winner) => (
                    <div key={uuid()} className="flex-col">
                        <div className="font-bold">{winner.name}</div>
                        {winner.summary} - {winner.win_list.length}개
                        <div>
                            {winner.win_list.map((elem) => (
                                <div key={uuid()} className="flex-col">
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
        </div>
    );
};

export default SquashRanks;
