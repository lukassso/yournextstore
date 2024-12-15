import { useCallback, useState } from "react";
import { GallerySlider } from "./gallery-slider";
import { GalleryThumbnails } from "./gallery-thumbnails";

type GalleryContentProps = {
	images: string[];
	selectedIndex: number;
	setSelectedIndex: (index: number) => void;
	isDrawer?: boolean;
};

export const GalleryContent = ({
	images,
	selectedIndex,
	setSelectedIndex,
	isDrawer = false,
}: GalleryContentProps) => {
	const [isTransitioning, setIsTransitioning] = useState(false);

	const handleImageChange = useCallback(
		(newIndex: number) => {
			if (isTransitioning) return;
			let timeoutId: NodeJS.Timeout;

			setIsTransitioning(true);
			setSelectedIndex(newIndex);

			timeoutId = setTimeout(() => {
				setIsTransitioning(false);
			}, 700);

			return () => clearTimeout(timeoutId);
		},
		[setSelectedIndex, isTransitioning],
	);

	const handleSwipe = useCallback(
		(direction: "next" | "prev") => {
			const newIndex =
				direction === "next"
					? Math.min(selectedIndex + 1, images.length - 1)
					: Math.max(selectedIndex - 1, 0);

			handleImageChange(newIndex);
		},
		[selectedIndex, images.length, handleImageChange],
	);

	return (
		<div className={`grid ${isDrawer ? "h-[75vh] grid-rows-[1fr_auto]" : "gap-4"}`}>
			<div
				role="region"
				aria-label="Product gallery"
				onKeyDown={(e) => {
					if (e.key === "ArrowLeft") handleSwipe("prev");
					if (e.key === "ArrowRight") handleSwipe("next");
				}}
				tabIndex={0}
			>
				<GallerySlider images={images} selectedIndex={selectedIndex} onSwipe={handleSwipe} />
			</div>

			{images.length > 1 && (
				<GalleryThumbnails images={images} selectedIndex={selectedIndex} onSelect={handleImageChange} />
			)}
		</div>
	);
};
