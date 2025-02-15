import Link from "next/link";
import React from "react";
import Image from "next/image";

export const Header = () => {
	return (
		<header className='p-2 flex justify-start items-center bg-white'>
			<Link
				href='/'
				rel='noopener noreferrer'
				className=''
			>
				<Image
					src='/icon-car.png'
					alt='Logo'
					width={50}
					height={50}
				/>
			</Link>
		</header>
	);
};
