import { useRef } from "react";

type TouchPoint = {
	x: number;
	y: number;
};

export const useSwipe = (onSwipe: (direction: "next" | "prev") => void) => {
	const touchStart = useRef<TouchPoint>({ x: 0, y: 0 });
	const touchEnd = useRef<TouchPoint>({ x: 0, y: 0 });

	const onTouchStart = (e: React.TouchEvent) => {
		if (!e.touches[0]) return;

		touchStart.current = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY,
		};
	};

	const onTouchEnd = (e: React.TouchEvent) => {
		if (!e.changedTouches[0]) return;

		touchEnd.current = {
			x: e.changedTouches[0].clientX,
			y: e.changedTouches[0].clientY,
		};

		const diffX = touchStart.current.x - touchEnd.current.x;
		const diffY = touchStart.current.y - touchEnd.current.y;

		if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
			onSwipe(diffX > 0 ? "next" : "prev");
		}
	};

	return { onTouchStart, onTouchEnd };
};
