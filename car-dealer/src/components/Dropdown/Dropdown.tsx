import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

type ResultsItem = {
	MakeId: number;
	MakeName: string;
	VehicleTypeId?: number;
	VehicleTypeName?: string;
};

type YearsItem = {
	value: number;
	label: string;
};

type DropdownItem = ResultsItem | YearsItem;

type Props = {
	defaultLabel: string;
	label?: string;
	results: DropdownItem[];
	onClick?: (value: number) => void;
	type: "make" | "year";
};
function Dropdown(props: Props) {
	const { label, results, defaultLabel, type, onClick } = props;

	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

	const toggleMenu = () => setIsOpen(!isOpen);

	const handleItemClick = (result: DropdownItem) => {
		setIsOpen(false);
		setSelectedItem(result);

		if (onClick) {
			if (type === "make" && "MakeId" in result) {
				// Type guard and type check
				onClick(result.MakeId);
			} else if (type === "year" && "value" in result) {
				// Type guard and type check
				onClick(result.value);
			}
		}
	};

	const displayLabel = selectedItem
		? "MakeName" in selectedItem
			? selectedItem.MakeName
			: selectedItem.label
		: label || defaultLabel;

	return (
		<div className='relative inline-block text-left max-h-80'>
			<div>
				<button
					type='button'
					className='min-w-40 inline-flex w-full items-center justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50'
					aria-expanded={isOpen}
					aria-haspopup='true'
					onClick={toggleMenu}
				>
					{displayLabel}
					{isOpen ? (
						<ChevronUpIcon className='' />
					) : (
						<ChevronDownIcon className='' />
					)}
				</button>
			</div>

			{isOpen && (
				<div
					className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden overflow-auto max-h-60'
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='menu-button'
				>
					<div
						className='py-1'
						role='none'
					>
						{results.map((result) => (
							<button
								key={"MakeName" in result ? result.MakeName : result.label}
								className={`px-4 py-2 text-sm w-full text-left ${
									selectedItem === result
										? "text-green-700 cursor-default bg-slate-50"
										: "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
								}`}
								role='menuitem'
								onClick={() => handleItemClick(result)}
							>
								{"MakeName" in result ? result.MakeName : result.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Dropdown;
