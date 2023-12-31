"use client";
import { competition_squash_url } from "@/lib/url";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";

export interface CompetitionResponse {
    comp: CompetitionData;
    winners: WinnerData[];
}

interface CompetitionData {
    id: number;
    competition_name: string;
    start_date: string;
    center_name: string;
    host: string;
}

interface WinnerData {
    1: string[];
    2: string[];
    3: string[];
    division: string;
}

export interface CompetitionDetailProps {
    id: string;
}

const CompetitionDetail: FC<CompetitionDetailProps> = ({ id }) => {
    const [res, setRes] = useState<CompetitionResponse>();

    const fetchData = async () => {
        try {
            const response = await fetch(
                `${competition_squash_url}/competition_detail_api/?id=${id}`
            );
            const result = await response.json();
            setRes(result);
        } catch (error) {}
    };

    useEffect(() => {
        console.log(id);
        fetchData();
    }, []);

    return (
        <div className="space-y-2">
            {res ? (
                <div className="flex flex-col">
                    <div className="font-bold text-2xl">
                        대회이름: {res?.comp.competition_name}
                    </div>
                    <div className="font-bold">
                        대회일자: {res?.comp.start_date}
                    </div>
                    <div className="font-bold">주최: {res?.comp.host}</div>
                </div>
            ) : (
                <div>
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            )}
            <div className="space-y-2">
                {res?.winners.map((winner) => (
                    <div key={winner.division} className="flex flex-col">
                        <div className="font-bold">{winner.division}</div>
                        {winner[1] ? (
                            winner[1].map((elem, index) => (
                                <div key={index}>1위 - {elem}</div>
                            ))
                        ) : (
                            <div></div>
                        )}
                        {winner[2] ? (
                            winner[2].map((elem, index) => (
                                <div key={index}>2위 - {elem}</div>
                            ))
                        ) : (
                            <div></div>
                        )}
                        {winner[3] ? (
                            winner[3].map((elem, index) => (
                                <div key={index}>3위 - {elem}</div>
                            ))
                        ) : (
                            <div></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompetitionDetail;
