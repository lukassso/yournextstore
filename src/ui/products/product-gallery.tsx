"use client";

import { DialogDescription, DialogTitle } from "@/ui/shadcn/dialog";
import { Drawer, DrawerClose, DrawerContent } from "@/ui/shadcn/drawer";
import { Root as VisuallyHiddenRoot } from "@radix-ui/react-visually-hidden";
import { type PanInfo, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { GallerySlider } from "./components/gallery-slider";
import { ProductThumbnail } from "./components/product-thumbnail";

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

			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} aria-label="Product gallery viewer">
				<VisuallyHiddenRoot asChild>
					<div>
						<DialogTitle />
						<DialogDescription />
					</div>
				</VisuallyHiddenRoot>

				<DrawerContent className="h-[90vh]">
					<DrawerClose className="hidden sm:block">
						<div className="flex items-center justify-center">
							<div className="p-0 mt-6 w-8 h-8 flex items-center justify-center rounded-full border border-black hover:bg-gray-200 cursor-pointer">
								<XIcon />
							</div>
						</div>
					</DrawerClose>
					<div className="flex flex-col h-full" role="dialog" aria-modal="true">
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
