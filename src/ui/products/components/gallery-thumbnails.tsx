import { ProductThumbnail } from "./product-thumbnail";

type GalleryThumbnailsProps = {
	images: string[];
	selectedIndex: number;
	onSelect: (index: number) => void;
	is3DEnabled?: boolean;
	srcModel3d?: string;
};

export const GalleryThumbnails = ({
	images,
	selectedIndex,
	onSelect,
	is3DEnabled,
	srcModel3d,
}: GalleryThumbnailsProps) => {
	return (
		<div className="flex gap-2 overflow-auto px-1 pb-safe">
			{is3DEnabled && srcModel3d && (
				<ProductThumbnail
					key="3d-model"
					src={srcModel3d}
					index={0}
					isSelected={selectedIndex === 0}
					onSelect={onSelect}
					is3D
				/>
			)}
			{images.map((src, index) => (
				<ProductThumbnail
					key={index}
					src={src}
					index={is3DEnabled ? index + 1 : index}
					isSelected={is3DEnabled ? index + 1 === selectedIndex : index === selectedIndex}
					onSelect={onSelect}
				/>
			))}
		</div>
	);
};
