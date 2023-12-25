import AllBlogs from "../components/Board/AllBlogs";
import MostLikedBlogs from "../components/Board/MostLikedBlogs";
import SportsSection from "@/components/SportsSection";

export default async function Home() {
    return (
        <main className="p-8 space-y-5">
            <SportsSection />
            <AllBlogs
                params={{
                    id: "all",
                }}
            />
            <MostLikedBlogs
                params={{
                    id: "all",
                }}
            />
        </main>
    );
}
