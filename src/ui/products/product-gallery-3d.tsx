"use client";

import { GalleryDrawer } from "@/ui/products/components/gallery-drawer";
import { Model3DLoader } from "@/ui/products/components/gallery-model-3d-loader";
import { GallerySlider } from "@/ui/products/components/gallery-slider";
import { ProductThumbnail } from "@/ui/products/components/product-thumbnail";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useState } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
	ssr: false,
});

type ProductGallery3DProps = {
	model3d: string;
	imageSrc?: string;
	alt: string;
	additionalImages: string[];
};

export const ProductGallery3D = ({ model3d, imageSrc, alt, additionalImages }: ProductGallery3DProps) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const allImages = imageSrc ? [imageSrc, ...additionalImages] : additionalImages;

	const handleSwipe = useCallback(
		(direction: "next" | "prev") => {
			if (selectedIndex === 0 && direction === "prev") return;
			const newIndex =
				direction === "next" ? Math.min(selectedIndex + 1, allImages.length) : Math.max(selectedIndex - 1, 0);
			setSelectedIndex(newIndex);
		},
		[selectedIndex, allImages.length],
	);

	const renderGalleryContent = (isDrawerView = false) => (
		<div className={`relative aspect-square w-full overflow-hidden rounded-lg`}>
			{selectedIndex === 0 ? (
				<Suspense fallback={<Model3DLoader />}>
					<Spline className="w-full object-cover object-center aspect-square" scene={model3d} />
				</Suspense>
			) : (
				<GallerySlider images={allImages} selectedIndex={selectedIndex - 1} onSwipe={handleSwipe} />
			)}
		</div>
	);

	const renderThumbnails = () => (
		<div className="flex gap-2">
			{allImages.map((src, index) => (
				<ProductThumbnail
					key={index}
					src={src}
					index={index + 1}
					isSelected={index + 1 === selectedIndex}
					onSelect={setSelectedIndex}
				/>
			))}
			<ProductThumbnail
				key="3d-model"
				src={model3d}
				index={0}
				isSelected={selectedIndex === 0}
				onSelect={setSelectedIndex}
				is3D
			/>
		</div>
	);

	return (
		<>
			<div className="grid gap-4">
				<div
					onClick={() => selectedIndex !== 0 && setIsDrawerOpen(true)}
					className={selectedIndex !== 0 ? "cursor-zoom-in" : ""}
					role={selectedIndex !== 0 ? "button" : undefined}
					aria-label={selectedIndex !== 0 ? "Open gallery view" : undefined}
					tabIndex={selectedIndex !== 0 ? 0 : undefined}
				>
					{renderGalleryContent()}
				</div>
				{renderThumbnails()}
			</div>

			<GalleryDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<div className={`grid h-[75vh] grid-rows-[1fr_auto]`}>
					{renderGalleryContent(true)}
					<div className="p-4">{renderThumbnails()}</div>
				</div>
			</GalleryDrawer>
		</>
	);
};
