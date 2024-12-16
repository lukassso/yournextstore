import Image from "next/image";
import { useRef } from "react";
import { useSwipe } from "../hooks/use-swipe";

type GallerySliderProps = {
	images: string[];
	selectedIndex: number;
	onSwipe: (direction: "next" | "prev") => void;
	alt: string;
};

export const GallerySlider = ({
	images,
	selectedIndex,
	onSwipe,
	alt = "Gallery image",
}: GallerySliderProps) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const { onTouchStart, onTouchEnd } = useSwipe(onSwipe);

	return (
		<div
			ref={sliderRef}
			className="relative h-full w-full overflow-hidden rounded-lg"
			role="region"
			aria-label="Product image gallery"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "ArrowLeft") onSwipe("prev");
				if (e.key === "ArrowRight") onSwipe("next");
			}}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
		>
			{images.map((src, index) => (
				<div
					key={index}
					className="absolute h-full w-full transition-all duration-700 ease-out"
					style={{
						transform: `perspective(1000px) 
                       	translateX(${(index - selectedIndex) * 100}%) 
                       	rotateY(${(index - selectedIndex) * 3}deg)
                        scale(${index === selectedIndex ? 1 : 0.85})`,
						willChange: index === selectedIndex ? "transform" : "auto",
					}}
				>
					<Image src={src} alt={alt} className="w-full object-contain" width={1200} height={1200} />
				</div>
			))}
		</div>
	);
};
