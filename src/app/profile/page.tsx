export default function Profile() {
    return (
        <main className="flex-col grid justify-items-center p-5">
            <div className="m-4 space-y-5">
                <img
                    src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <h1 className="text-3xl font-bold">스포타임 양재역점</h1>
                <div className="flex flex-col">
                    <a className="link">홈페이지</a>
                    <a className="link">네이버 블로그</a>
                </div>
                <div className="">주소: </div>
                <p className="">다양한 운동을 할수있는 스포타임 센터입니다.</p>

                <div className="">그동한 작성한 글 목록</div>
            </div>
        </main>
    );
}
