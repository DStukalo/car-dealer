import { NextApiRequest, NextApiResponse } from "next";
import { years } from "@/consts/consts";
import { Repo } from '@/types/types';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
			const result = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
			if (!result.ok) {
				throw new Error(`HTTP error! status: ${result.status}`);
			}
			const repo: Repo = await result.json();

      if (!result.ok) { // Check for HTTP errors
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const makesAndYears = repo.Results.flatMap((result) => {
        return years.map((year) => ({
          makeId: result.MakeId.toString(), // Convert to string HERE
          year: year.value.toString(),       // Convert to string HERE
        }));
      });

			res.status(200).json(makesAndYears);
		} catch (error) {
			console.error("Error in API route:", error);
			res.status(500).json({ error: 'Failed to fetch vehicles' });
		}
  } else {
    res.status(405).json({ error: "Method Not Allowed" }); // More standard message
  }
}