"use client";

import { BaseGallery } from "@/ui/products/components/gallery-base";
import { useState } from "react";

interface ProductGallery3DProps {
	srcModel3d: string;
	imageSrc?: string;
	additionalImages: string[];
	alt: string;
}

export const ProductGallery3D = ({ srcModel3d, alt, imageSrc, additionalImages }: ProductGallery3DProps) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const allImages = imageSrc ? [imageSrc, ...additionalImages] : additionalImages;

	return (
		<BaseGallery
			images={allImages}
			selectedIndex={selectedIndex}
			onSelectIndex={setSelectedIndex}
			isDrawerOpen={isDrawerOpen}
			onDrawerOpenChange={setIsDrawerOpen}
			srcModel3d={srcModel3d}
			alt={alt}
		/>
	);
};
