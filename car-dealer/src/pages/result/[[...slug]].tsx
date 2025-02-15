import { useRouter } from "next/router";
import type { GetStaticPaths } from "next";
import { MakeAndYear, Models } from '@/types/types';



export async function generateStaticParams() {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
			: "http://localhost:3000"; // Fallback for local dev

		const res = await fetch(`${baseUrl}/api/vehicles`);

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const makesAndYears: MakeAndYear[] = await res.json();

		const paths = makesAndYears.map(({ makeId, year }) => ({
			params: { slug: [makeId, year] },
		}));

		return { paths, fallback: false };
	} catch (error) {
		console.error("Error in generateStaticParams:", error);
		return { paths: [], fallback: false };
	}
}

export default function ResultsPage({
	models,
	year,
}: {
	models: Models;
	year: string;
}) {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	if (!models || models.Count === 0) {
		return <p>No models found for Year: {year}</p>;
	}

	return (
		<div className='flex justify-center items-center py-4'>
			<div className='flex flex-col gap-4'>
				<h1 className='text-xl'>Models for Year: {year}</h1>
				<ul className='flex flex-col gap-2 '>
					{models.Results.map((model) => (
						<li
							key={model.Model_ID}
							className='flex gap-2'
						>
							<span>{model.Make_Name}</span>
							<span>{model.Model_Name}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	return generateStaticParams();
};

export async function getStaticProps({
	params,
}: {
	params: { slug: string[] };
}) {
	const { slug } = params;
	const makeId = slug[0];
	const year = slug[1];

	if (!makeId || !year) {
		return {
			props: { models: null, year: null },
			revalidate: 600,
		};
	}

	try {
		const res = await fetch(
			`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
		);
		const data = await res.json();

		return {
			props: {
				models: data,
				year: year,
			},
			revalidate: 600,
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			props: {
				models: null,
				year: null,
			},
			revalidate: 600,
		};
	}
}
