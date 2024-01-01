import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/header";
import Providers from "@/components/Providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "sports for life",
    description: "생활체육 정보 플랫폼",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="kr">
            <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
            <Script id="google-analytics">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
    
            gtag('config', 'G-KYBD2P8KTB');
        `}
            </Script>
            <body className={inter.className}>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
