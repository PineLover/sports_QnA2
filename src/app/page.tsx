import FormNewPost from "@/components/form-new-post";
import AllBlogs from "./blogs/AllBlogs";
import MostLikedBlogs from "./blogs/MostLikedBlogs";

export default async function Home() {
    return (
        <main className="p-8 space-y-5">
            <AllBlogs />
            <MostLikedBlogs />
        </main>
    );
}
