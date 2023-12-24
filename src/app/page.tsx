import AllBlogs from "./blogs/AllBlogs";
import MostLikedBlogs from "./blogs/MostLikedBlogs";
import SportsSection from "@/components/SportsSection";

export default async function Home() {
    return (
        <main className="p-8 space-y-5">
            <SportsSection />
            <AllBlogs />
            <MostLikedBlogs />
        </main>
    );
}
