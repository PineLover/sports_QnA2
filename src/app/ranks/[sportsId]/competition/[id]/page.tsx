import CompetitionDetail, {
    CompetitionDetailProps,
} from "@/components/Ranks/CompetitionDetail";
import { FC } from "react";

export interface CompetitionDetailPageProps {
    params: {
        sportsId: string;
        id: string;
    };
}

const CompetitionDetailPage: FC<CompetitionDetailPageProps> = ({ params }) => {
    return (
        <div className="p-8">
            <CompetitionDetail id={params.id} sportsId={params.sportsId} />
        </div>
    );
};

export default CompetitionDetailPage;
