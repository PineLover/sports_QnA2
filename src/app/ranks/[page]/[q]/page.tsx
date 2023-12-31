import SquashRanks from "@/components/Ranks/SquashRanks";
import SportsSection from "@/components/SportsSection";
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
            <SquashRanks q={params.q} page={params.page} />
        </div>
    );
};

export default RanksPage;
