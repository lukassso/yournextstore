import { GalleryDrawer } from "@/ui/products/components/gallery-drawer";
import { GalleryLoader } from "@/ui/products/components/gallery-loader";
import { GallerySlider } from "@/ui/products/components/gallery-slider";
import { GalleryThumbnails } from "@/ui/products/components/gallery-thumbnails";
import dynamic from "next/dynamic";
import { useCallback } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
	ssr: false,
	loading: () => <GalleryLoader />,
});

interface BaseGalleryProps {
	images: string[];
	selectedIndex: number;
	onSelectIndex: (index: number) => void;
	isDrawerOpen: boolean;
	onDrawerOpenChange: (open: boolean) => void;
	srcModel3d?: string;
	alt: string;
}

export const BaseGallery = ({
	images,
	selectedIndex,
	onSelectIndex,
	isDrawerOpen,
	onDrawerOpenChange,
	srcModel3d,
	alt,
}: BaseGalleryProps) => {
	const handleSwipe = useCallback(
		(direction: "next" | "prev") => {
			const maxIndex = srcModel3d ? images.length : images.length - 1;
			const newIndex =
				direction === "next" ? Math.min(selectedIndex + 1, maxIndex) : Math.max(selectedIndex - 1, 0);
			onSelectIndex(newIndex);
		},
		[selectedIndex, images.length, srcModel3d, onSelectIndex],
	);

	const renderGalleryContent = () => (
		<div className="relative aspect-square w-full overflow-hidden rounded-lg">
			{srcModel3d && selectedIndex === 0 ? (
				<Spline className="w-full object-cover" scene={srcModel3d} />
			) : (
				<GallerySlider
					images={images}
					selectedIndex={srcModel3d ? selectedIndex - 1 : selectedIndex}
					onSwipe={handleSwipe}
					alt={alt}
				/>
			)}
		</div>
	);

	return (
		<>
			<div className="grid gap-4">
				<div
					onClick={() => selectedIndex !== 0 && onDrawerOpenChange(true)}
					role={selectedIndex !== 0 ? "button" : undefined}
					aria-label={selectedIndex !== 0 ? "Open gallery view" : undefined}
					tabIndex={selectedIndex !== 0 ? 0 : undefined}
				>
					{renderGalleryContent()}
				</div>
				<GalleryThumbnails
					images={images}
					selectedIndex={selectedIndex}
					onSelect={onSelectIndex}
					is3DEnabled={!!srcModel3d}
					srcModel3d={srcModel3d}
				/>
			</div>

			<GalleryDrawer isOpen={isDrawerOpen} onOpenChange={onDrawerOpenChange}>
				<div className="grid h-[75vh] grid-rows-[1fr_auto]">
					{renderGalleryContent()}
					<div className="p-4">
						<GalleryThumbnails
							images={images}
							selectedIndex={selectedIndex}
							onSelect={onSelectIndex}
							is3DEnabled={!!srcModel3d}
							srcModel3d={srcModel3d}
						/>
					</div>
				</div>
			</GalleryDrawer>
		</>
	);
};
