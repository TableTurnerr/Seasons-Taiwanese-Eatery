"use client";

import { useEffect } from "react";

export default function TabTitleHandler() {
	useEffect(() => {
		const originalTitle = document.title;

		const handleVisibilityChange = () => {
			if (document.hidden) {
				document.title = "We Miss You, Come back!";
			} else {
				document.title = originalTitle;
			}
			console.log("document.hidden", document.hidden);
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener(
				"visibilitychange",
				handleVisibilityChange,
			);
		};
	});

	return null;
}
