import Image from "next/image";
import { useRef } from "react";
import { useSwipe } from "../hooks/use-swipe";

type GallerySliderProps = {
	images: string[];
	selectedIndex: number;
	onSwipe: (direction: "next" | "prev") => void;
};

export const GallerySlider = ({ images, selectedIndex, onSwipe }: GallerySliderProps) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const { onTouchStart, onTouchEnd } = useSwipe(onSwipe);

	return (
		<div
			ref={sliderRef}
			className="relative h-full w-full overflow-hidden rounded-lg"
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
		>
			{images.map((src, index) => (
				<div
					key={index}
					className="absolute h-full w-full transition-all duration-700 ease-out"
					style={{
						transform: `translateX(${(index - selectedIndex) * 100}%) 
                       scale(${index === selectedIndex ? 1 : 0.85})
                       perspective(1000px)
                       rotateY(${(index - selectedIndex) * 3}deg)`,
						opacity: index === selectedIndex ? 1 : 0.5,
						zIndex: index === selectedIndex ? 10 : 1,
						pointerEvents: index === selectedIndex ? "auto" : "none",
					}}
				>
					<Image src={src} alt="" className="h-full w-full object-contain" width={1200} height={1200} />
				</div>
			))}
		</div>
	);
};
