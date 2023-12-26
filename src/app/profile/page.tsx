import { getCurrentProfile, getCurrentUser } from "@/lib/session";
import Link from "next/link";

export default async function Profile() {
    const user = await getCurrentUser();
    const profile = await getCurrentProfile();

    return (
        <main className="flex-col grid justify-items-center p-5">
            <div className="m-4 space-y-5">
                <Link href={"/profile/edit"}>프로필 수정</Link>
                <img
                    src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <h1 className="text-3xl font-bold">{profile?.nickname}</h1>
                <div className="flex flex-col">
                    <a className="link" href="">
                        홈페이지 - {profile?.link1}
                    </a>
                </div>
                <div className="">주소: {profile?.address}</div>
                <div className="">종목: {user?.sports?.name ?? "없음"}</div>
                <p className="">소개: {profile?.description}</p>

                <div className="">그동한 작성한 글 목록</div>
            </div>
        </main>
    );
}
