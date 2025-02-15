export type ResultsItem = {
	MakeId: number;
	MakeName: string;
	VehicleTypeId: number;
	VehicleTypeName: string;
};

export type Repo = {
	Count: number;
	Message: string;
	Results: ResultsItem[];
	SearchCriteria: string;
};

export type ModelsItem = {
	Make_ID: number;
	Make_Name: string;
	Model_ID: number;
	Model_Name: string;
};

export type Models = {
	Count: number;
	Message: string;
	Results: ModelsItem[];
	SearchCriteria: string;
};

export interface MakeAndYear {
	makeId: string;
	year: string;
}