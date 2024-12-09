import { motion } from "framer-motion";
import Image from "next/image";

type ProductThumbnailProps = {
	src: string;
	onSelect: (index: number) => void;
	index: number;
	isSelected: boolean;
};

export const ProductThumbnail = ({ src, onSelect, index, isSelected }: ProductThumbnailProps) => {
	return (
		<div
			onClick={() => onSelect(index)}
			className={`cursor-pointer rounded-lg overflow-hidden ${isSelected ? "ring-2 ring-black" : ""}`}
		>
			<motion.div layoutId={`thumbnail-${index}`}>
				<Image
					className="w-full bg-neutral-100 object-cover object-center transition-opacity hover:opacity-75"
					src={src}
					width={700 / 3}
					height={700 / 3}
					sizes="(max-width: 1024x) 33vw, (max-width: 1280px) 20vw, 225px"
					alt=""
				/>
			</motion.div>
		</div>
	);
};
