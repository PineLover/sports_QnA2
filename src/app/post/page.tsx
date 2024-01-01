import FormNewPost from "@/components/Forms/form-new-post";
import LoginRequire from "@/components/LoginRequire";
import { getCurrentUser } from "@/lib/session";

export default async function Question() {
    const user = await getCurrentUser();

    return (
        <main className="w-3/4 mx-auto my-5">
            {user ? (
                <FormNewPost />
            ) : (
                <div className="">
                    <LoginRequire />
                </div>
            )}
        </main>
    );
}
