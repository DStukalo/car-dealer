import React from "react";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Footer = () => {
	return (
		<footer className=' p-2 mt-auto flex gap-2 justify-center items-center text-sm'>
			<p>Copyright © 2025. All Rights Reserved.</p>
			<Link
				href='https://github.com/DStukalo'
				rel='noopener noreferrer'
				target='_blank'
				className=''
			>
				<GitHubLogoIcon />
			</Link>
		</footer>
	);
};
