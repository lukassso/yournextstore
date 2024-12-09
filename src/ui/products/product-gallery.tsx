"use client";

import { DialogDescription, DialogTitle } from "@/ui/shadcn/dialog";
import { Drawer, DrawerContent } from "@/ui/shadcn/drawer";
import { Root as VisualyHiddenRoot } from "@radix-ui/react-visually-hidden";
import { type PanInfo, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";
import { GallerySlider } from "./components/gallery-slider";
import { ProductThumbnail } from "./components/product-thumbnail";

// const { Root } = VisualyHidden;

type ProductGalleryProps = {
	images: string[];
};

const GalleryContent = ({
	images,
	selectedIndex,
	setSelectedIndex,
	isDrawer = false,
}: {
	images: string[];
	selectedIndex: number;
	setSelectedIndex: (index: number) => void;
	isDrawer?: boolean;
}) => {
	const [isTransitioning, setIsTransitioning] = useState(false);

	const handleImageChange = useCallback(
		(newIndex: number) => {
			if (isTransitioning) return;

			setIsTransitioning(true);
			setSelectedIndex(newIndex);

			setTimeout(() => {
				setIsTransitioning(false);
			}, 700);
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
			<GallerySlider images={images} selectedIndex={selectedIndex} onSwipe={handleSwipe} />

			<div className="flex gap-2 overflow-auto px-1 pb-safe">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => handleImageChange(index)}
						disabled={isTransitioning}
						className={`relative aspect-square h-20 overflow-hidden rounded-lg border-2 transition-all
							${
								selectedIndex === index
									? "border-black opacity-100"
									: "border-transparent opacity-60 hover:opacity-100"
							}`}
					>
						<Image src={image} alt="" className="h-full w-full object-cover" width={80} height={80} />
					</button>
				))}
			</div>
		</div>
	);
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
				<div onClick={() => setIsDrawerOpen(true)} className="cursor-zoom-in">
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
								alt=""
							/>
						</motion.div>
					</div>
				</div>

				{images.length > 1 && (
					<div className="mt-4 grid grid-cols-4 gap-2">
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

			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<VisualyHiddenRoot asChild>
					<div>
						<DialogTitle />
						<DialogDescription />
					</div>
				</VisualyHiddenRoot>
				<DrawerContent className="h-[90vh]">
					<div className="flex flex-col h-full">
						<div className="flex-1 px-6 pb-safe">
							<GalleryContent
								images={images}
								selectedIndex={selectedIndex}
								setSelectedIndex={setSelectedIndex}
								isDrawer={true}
							/>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
};
