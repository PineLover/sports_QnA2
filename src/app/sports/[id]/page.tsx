import AllBlogs from "@/components/Board/AllBlogs";
import MostLikedBlogs from "@/components/Board/MostLikedBlogs";
import SportsSection from "@/components/Board/SportsSection";
import { FC } from "react";

export interface SportsSelectedPageProps {
    params: {
        id: string;
        q: string;
    };
}

const SportsPage: FC<SportsSelectedPageProps> = async ({ params }) => {
    return (
        <main className="p-8 space-y-5">
            <SportsSection />
            <MostLikedBlogs
                params={{
                    id: params.id,
                    q: params.q,
                }}
            />
            <AllBlogs
                params={{
                    id: params.id,
                    q: params.q,
                }}
            />
        </main>
    );
};

export default SportsPage;
