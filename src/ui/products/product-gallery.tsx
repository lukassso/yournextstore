"use client";

import { type PanInfo, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { GalleryContent } from "./components/gallery-content";
import { GalleryDrawer } from "./components/gallery-drawer";
import { ProductThumbnail } from "./components/product-thumbnail";

type ProductGalleryProps = {
	images: string[];
};

export const ProductGallery = ({ images }: ProductGalleryProps) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
		const { offset } = info;
		if (Math.abs(offset.x) > 100) {
			const direction = offset.x > 0 ? -1 : 1;
			const newIndex = selectedIndex + direction;
			if (newIndex >= 0 && newIndex < images.length) {
				setSelectedIndex(newIndex);
			}
		}
	};

	if (images.length === 0) return null;

	return (
		<>
			<div>
				<div
					onClick={() => setIsDrawerOpen(true)}
					className="cursor-zoom-in"
					role="button"
					aria-label="Open gallery view"
					tabIndex={0}
				>
					<div className="relative aspect-square w-full overflow-hidden rounded-lg">
						<motion.div
							style={{ height: "100%", width: "100%" }}
							drag="x"
							dragConstraints={{ left: 0, right: 0 }}
							dragElastic={0.2}
							onDragEnd={handleDrag}
							initial={false}
						>
							<Image
								className="h-full w-full bg-neutral-100 object-contain object-center"
								src={images[selectedIndex] || ""}
								width={700}
								height={700}
								priority
								sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
								alt={`Product image ${selectedIndex + 1} of ${images.length}`}
								loading="eager"
							/>
						</motion.div>
					</div>
				</div>

				{images.length > 1 && (
					<div className="flex gap-2">
						{images.map((src, index) => (
							<ProductThumbnail
								key={index}
								src={src}
								index={index}
								isSelected={index === selectedIndex}
								onSelect={setSelectedIndex}
							/>
						))}
					</div>
				)}
			</div>

			<GalleryDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<GalleryContent
					images={images}
					selectedIndex={selectedIndex}
					setSelectedIndex={setSelectedIndex}
					isDrawer={true}
				/>
			</GalleryDrawer>
		</>
	);
};
