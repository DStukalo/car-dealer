import { Geist, Geist_Mono } from "next/font/google";
import { AppLayout } from "@/components/AppLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div
			className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
		>
			<AppLayout>
				<Component {...pageProps} />
			</AppLayout>
		</div>
	);
}
