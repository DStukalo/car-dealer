import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState, Suspense } from "react";
import Link from "next/link";
import { years } from "@/consts/consts";
import dynamic from "next/dynamic";
import { Repo } from '@/types/types';

const Dropdown = dynamic(() => import("@/components/Dropdown/Dropdown"), {
	ssr: false,
});



export default function Home({
	repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [makeId, setMakeId] = useState<number | undefined>();
	const [makeName, setMakeName] = useState<string | undefined>();
	const [year, setYear] = useState<number | undefined>();

	const handleMakeIdChange = (value: number) => {
		setMakeId(value);
		setMakeName(repo.Results.find((item) => item.MakeId === value)?.MakeName);
	};

	const handleYearChange = (value: number) => {
		setYear(value);
	};

	return (
		<div className='mx-auto p-8 pb-20'>
			<div className='flex flex-col lg:flex-row gap-4 lg:gap-20 justify-center items-center sm:items-start'>
				<Suspense fallback={<p>Loading makes...</p>}>
					<Dropdown
						results={repo.Results}
						label={makeName}
						defaultLabel='Make'
						type='make'
						onClick={handleMakeIdChange}
					/>
				</Suspense>

				<Suspense fallback={<p>Loading years...</p>}>
					<Dropdown
						results={years}
						defaultLabel='Year'
						type='year'
						label={year?.toString()}
						onClick={handleYearChange}
					/>
				</Suspense>

				<Link
					href={makeId && year ? `/result/${makeId}/${year}` : "/"}
					rel='noopener noreferrer'
					className={`gap-1 p-2 text-center no-underline ${
						!makeId || !year
							? "opacity-50 cursor-not-allowed"
							: "hover:underline hover:cursor-pointer"
					}`}
				>
					Go to models page
				</Link>
			</div>
			<footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
		</div>
	);
}

export const getServerSideProps = (async () => {
	try {
		const res = await fetch(
			"https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
		);

		if (!res.ok) {
			throw new Error(`API error: ${res.status} ${res.statusText}`);
		}

		const repo: Repo = await res.json();

		return { props: { repo } };
	} catch (error) {
		console.error("Fetching error:", error);
		return {
			props: {
				repo: {
					Count: 0,
					Message: "Error fetching data",
					Results: [],
					SearchCriteria: "",
				},
			},
		};
	}
}) satisfies GetServerSideProps<{ repo: Repo }>;
