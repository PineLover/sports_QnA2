"use client";
import { rank_history_url } from "@/lib/url";
import Link from "next/link";
import React, { FC, useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import RankSearchBar from "./RankSearchBar";

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

export interface SportsRanksHistoryProps {
    sportsId: string;
    page: number;
    q: string;
}

const SportsRanksHistory: FC<SportsRanksHistoryProps> = ({
    sportsId,
    q,
    page,
}) => {
    let [cur_page, setPage] = useState<number>(1);
    let [res, setRes] = useState<WinResponse>();

    const getRanks = useCallback(async () => {
        try {
            const response = await fetch(
                `${rank_history_url}${sportsId}/individual_history_list_api/?page=${cur_page}&q=${decodeURIComponent(
                    q
                )}`
            );
            const result = await response.json();
            setRes(result);
        } catch (error) {}
    }, []);

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
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <div>{cur_page} 페이지</div>
                <div className="btn btn-sm" onClick={onClickPrev}>
                    이전
                </div>
                <div className="btn btn-sm" onClick={onClickUp}>
                    이후
                </div>
                <RankSearchBar />
            </div>

            {q ? <div>검색어 - {decodeURIComponent(q)}</div> : <div></div>}

            <div className="space-y-3">
                {res ? (
                    <div></div>
                ) : (
                    <div>
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                )}
                {res?.win_datas.map((winner, index) => (
                    <div key={index} className="flex-col">
                        <div className="font-bold">{winner.name}</div>
                        {winner.summary} - {winner.win_list.length}개
                        <div>
                            {winner.win_list.map((elem, index2) => (
                                <div key={index2} className="flex-col">
                                    <Link
                                        href={`/ranks/${sportsId}/competition/${elem.competition.id}`}
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

export default SportsRanksHistory;
