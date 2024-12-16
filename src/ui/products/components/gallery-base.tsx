import { GalleryDrawer } from "@/ui/products/components/gallery-drawer";
import { GalleryLoader } from "@/ui/products/components/gallery-loader";
import { GallerySlider } from "@/ui/products/components/gallery-slider";
import { GalleryThumbnails } from "@/ui/products/components/gallery-thumbnails";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import { useKeyboardNavigation } from "../hooks/use-keyboard-navigation";

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
			if (direction === "next" && selectedIndex < images.length - 1) {
				onSelectIndex(selectedIndex + 1);
			}
			if (direction === "prev" && selectedIndex > 0) {
				onSelectIndex(selectedIndex - 1);
			}
		},
		[selectedIndex, images.length, onSelectIndex],
	);

	useKeyboardNavigation(handleSwipe);

	const renderGalleryContent = (isDrawer?: boolean) => (
		<div className={`relative ${isDrawer ? "h-full" : "aspect-square"} w-full overflow-hidden rounded-lg`}>
			{srcModel3d && selectedIndex === 0 ? (
				<div className={`${isDrawer ? "h-full" : "aspect-square"} w-full`}>
					<Spline className="w-full h-full object-contain" scene={srcModel3d} />
				</div>
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
					onClick={() => {
						const shouldOpenDrawer = srcModel3d ? selectedIndex !== 0 : true;
						shouldOpenDrawer && onDrawerOpenChange(true);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							const shouldOpenDrawer = srcModel3d ? selectedIndex !== 0 : true;
							shouldOpenDrawer && onDrawerOpenChange(true);
						}
					}}
					role={srcModel3d ? (selectedIndex !== 0 ? "button" : undefined) : "button"}
					aria-label={
						srcModel3d ? (selectedIndex !== 0 ? "Open gallery view" : undefined) : "Open gallery view"
					}
					tabIndex={srcModel3d ? (selectedIndex !== 0 ? 0 : undefined) : 0}
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
					{renderGalleryContent(true)}
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
