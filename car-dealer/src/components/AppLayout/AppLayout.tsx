import React, { PropsWithChildren } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";

type Props = PropsWithChildren & {
	showHeader?: boolean;
	showFooter?: boolean;
};

export function AppLayout(props: Props) {
	const { showFooter = true, showHeader = true, children } = props;
	return (
		<div className='h-full min-h-screen w-full flex flex-col bg-app-background'>
			{showHeader && <Header />}
			<main className='flex flex-col lg:flex-row gap-4 lg:gap-20 justify-center items-center sm:items-start'>
				{children}
			</main>

			{showFooter && <Footer />}
		</div>
	);
}
