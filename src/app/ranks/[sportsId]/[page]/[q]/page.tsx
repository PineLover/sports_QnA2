import SportsRanksHistory from "@/components/Ranks/SportsRanksHistory";
import SportsSection from "@/components/Board/SportsSection";
import { Prisma } from "@prisma/client";
import { FC } from "react";
import { RanksPageProps } from "../page";

const RanksPage: FC<RanksPageProps> = ({ params }) => {
    return (
        <div className="p-8">
            <SportsRanksHistory
                q={params.q}
                page={params.page}
                sportsId={params.sportsId}
            />
        </div>
    );
};

export default RanksPage;
