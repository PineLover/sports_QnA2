import SelectSportsRank from "@/components/Ranks/SelectSportsRank";
import SportsRanksHistory from "@/components/Ranks/SportsRanksHistory";
import SportsSection from "@/components/Board/SportsSection";
import { Prisma } from "@prisma/client";
import { FC } from "react";

export interface RanksPageProps {
    params: {
        q: string;
        page: number;
    };
}

const RanksPage: FC<RanksPageProps> = ({ params }) => {
    return (
        <div className="p-8">
            <SelectSportsRank />
        </div>
    );
};

export default RanksPage;
