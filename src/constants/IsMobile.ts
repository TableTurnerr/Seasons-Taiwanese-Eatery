import { useState, useEffect } from "react";

export function useIsMobile(): { isMobile: boolean; isSmallMobile: boolean } {
	const [isMobile, setIsMobile] = useState(true);
	const [isSmallMobile, setSmallMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 700);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		const checkMobile = () => setSmallMobile(window.innerWidth < 450);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return { isMobile, isSmallMobile };
}
