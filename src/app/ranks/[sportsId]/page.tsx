import SportsRanksHistory from "@/components/Ranks/SportsRanksHistory";
import SportsSection from "@/components/Board/SportsSection";
import { Prisma } from "@prisma/client";
import React from "react";
import { FC } from "react";

export interface RanksPageProps {
    params: {
        sportsId: string;
        q: string;
        page: number;
    };
}

const RanksPage: FC<RanksPageProps> = ({ params }) => {
    return (
        <div className="p-8">
            <SportsRanksHistory sportsId={params.sportsId} q={""} page={1} />
        </div>
    );
};

export default RanksPage;
