import Script from "next/script";
import AllBlogs from "../components/Board/AllBlogs";
import MostLikedBlogs from "../components/Board/MostLikedBlogs";
import SportsSection from "@/components/SportsSection";

export default async function Home() {
    return (
        <main className="p-8 space-y-5">
            <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
            <Script id="google-analytics">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
        
                gtag('config', 'G-KYBD2P8KTB');
            `}
            </Script>
            <SportsSection />
            <AllBlogs
                params={{
                    id: "",
                    q: "",
                }}
            />
            <MostLikedBlogs
                params={{
                    id: "",
                    q: "",
                }}
            />
        </main>
    );
}
