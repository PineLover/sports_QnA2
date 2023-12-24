"use client";
import { Sports } from "@/app/sports/page";
import { SportsSelectContext, ResultContextType } from "@/lib/context";
import { local_url } from "@/lib/url";
import React, { ChangeEvent, useContext, useState } from "react";

export var selectedSportName = "";

const SportsSection = () => {
    var { selectedSportsId } = useContext(SportsSelectContext);
    const [sports, setSports] = useState<Sports[]>([]);

    const getSports = async () => {
        try {
            const response = await fetch(`${local_url}/api/sports`);
            const result = await response.json();
            setSports(result.sports);

            selectedSportName = result.sports.name;
        } catch (error) {}
    };

    function selectSportsId(sportsId: string) {
        selectedSportsId = sportsId;
        console.log(selectedSportsId);
    }

    getSports();

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-4 bg-green-100 p-4 rounded">
                관심 종목 선택
            </h1>
            <div className="flex space-x-5">
                {sports.map((sport) => (
                    <div
                        key={sport.id}
                        className="btn"
                        onClick={(e) => selectSportsId(`${sport.id}`)}
                    >
                        {sport.name} - {sport._count.Post}개
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SportsSection;
