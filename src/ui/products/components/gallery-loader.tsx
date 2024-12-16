import { Loader2 } from "lucide-react";

export const GalleryLoader = () => {
	return (
		<div
			role="status"
			aria-label="Loading gallery"
			className="w-full aspect-square bg-neutral-50/50 backdrop-blur-sm rounded-lg flex items-center justify-center"
		>
			<div className="relative">
				<Loader2 className="w-8 h-8 text-neutral-400 animate-spin" aria-hidden="true" />
				<div className="absolute inset-0 animate-pulse bg-gradient-to-tr from-transparent via-neutral-200/20 to-transparent rounded-full" />
			</div>
			<span className="sr-only">Loading image...</span>
		</div>
	);
};
