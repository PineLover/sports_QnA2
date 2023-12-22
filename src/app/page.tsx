import FormNewPost from "@/components/form-new-post";
import AllBlogs from "./blogs/AllBlogs";
import FamousBlogs from "./blogs/FamousBlogs";

export default async function Home() {
    return (
        <main className="p-8 space-y-5">
            <AllBlogs />
            <FamousBlogs />
        </main>
    );
}
