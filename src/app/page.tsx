import Script from "next/script";
import AllBlogs from "../components/Board/AllBlogs";
import MostLikedBlogs from "../components/Board/MostLikedBlogs";
import SportsSection from "@/components/Board/SportsSection";

export default async function Home() {
    return (
        <main className="p-8 space-y-5">
            <SportsSection />
            <MostLikedBlogs
                params={{
                    id: "",
                    q: "",
                }}
            />
            <AllBlogs
                params={{
                    id: "",
                    q: "",
                }}
            />
        </main>
    );
}
