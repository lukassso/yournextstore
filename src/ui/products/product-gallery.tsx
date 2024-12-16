"use client";

import { BaseGallery } from "@/ui/products/components/gallery-base";
import { useState } from "react";

interface ProductGalleryProps {
	images: string[];
	alt: string;
}

export const ProductGallery = ({ images, alt }: ProductGalleryProps) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	if (images.length === 0) return null;

	return (
		<BaseGallery
			images={images}
			selectedIndex={selectedIndex}
			onSelectIndex={setSelectedIndex}
			isDrawerOpen={isDrawerOpen}
			onDrawerOpenChange={setIsDrawerOpen}
			alt={alt}
		/>
	);
};
