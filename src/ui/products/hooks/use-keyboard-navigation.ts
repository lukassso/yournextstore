import { useEffect } from "react";

export const useKeyboardNavigation = (onSwipe: (direction: "next" | "prev") => void) => {
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			onSwipe("prev");
		}
		if (e.key === "ArrowRight") {
			e.preventDefault();
			onSwipe("next");
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onSwipe]);
};
