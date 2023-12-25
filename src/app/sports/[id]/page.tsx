import AllBlogs from "@/components/Board/AllBlogs";
import MostLikedBlogs from "@/components/Board/MostLikedBlogs";
import SportsSection from "@/components/SportsSection";
import { FC } from "react";

export interface SportsSelectedPageProps {
    params: {
        id: string;
    };
}

const SportsPage: FC<SportsSelectedPageProps> = async ({ params }) => {
    console.log(`SportsPage ${params.id}`);

    return (
        <main className="p-8 space-y-5">
            <SportsSection />
            <AllBlogs
                params={{
                    id: params.id,
                }}
            />
            <MostLikedBlogs
                params={{
                    id: params.id,
                }}
            />
        </main>
    );
};

export default SportsPage;
