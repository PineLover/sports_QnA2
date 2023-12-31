import SquashRanks from "@/components/Ranks/SquashRanks";
import SportsSection from "@/components/SportsSection";
import { Prisma } from "@prisma/client";

export default function RanksPage() {
    return (
        <div className="p-8">
            <SquashRanks />
        </div>
    );
}
