import Image from "next/image";

type ProductThumbnailProps = {
	src: string;
	index: number;
	isSelected: boolean;
	onSelect: (index: number) => void;
	is3D?: boolean;
	disabled?: boolean;
};

export const ProductThumbnail = ({
	src,
	index,
	isSelected,
	onSelect,
	is3D,
	disabled,
}: ProductThumbnailProps) => {
	return (
		<button
			onClick={() => onSelect(index)}
			disabled={disabled}
			className={`relative aspect-square h-20 overflow-hidden rounded-lg border-2 transition-all
				${isSelected ? "border-black opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}
		>
			{is3D ? (
				<div className="h-full w-full flex items-center justify-center bg-neutral-100">
					<span className="text-sm font-medium">3D</span>
				</div>
			) : (
				<Image src={src} alt="" className="h-full w-full object-cover" width={80} height={80} />
			)}
		</button>
	);
};
