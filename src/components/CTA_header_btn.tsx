"use client";

import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { on } from "events";
import { div } from "framer-motion/client";
import { useIsMobile } from "@/constants/IsMobile";

interface AnimatedCTAButtonProps {
	onBlogClick: () => void;
	onRedirectClick?: () => void;
}

export const MapPinIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#621E21"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-map-pin-icon lucide-map-pin"
		>
			<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	);
};

export const TakeAwayIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-hamburger-icon lucide-hamburger"
		>
			<path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25" />
			<path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2" />
			<path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0" />
			<path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" />
		</svg>
	);
};

export const AnimatedCTAButton: React.FC<AnimatedCTAButtonProps> = ({
	onBlogClick,
	onRedirectClick,
}) => {
	const [hoveredButton, setHoveredButton] = useState<"left" | "right" | null>(
		null,
	);

	const { isMobile, isSmallMobile } = useIsMobile();
	return (
		<div
			className="flex justify-center items-center"
			style={{
				width: isMobile ? (isSmallMobile ? "90px" : "130px") : "230px",
				height: isMobile ? "35px" : "41px",
			}}
		>
			{isMobile ? (
				<div className="relative w-full h-full max-w-lg rounded-lg overflow-hidden flex items-center justify-center bg-primary border-primary-dark border shadow-md hover:shadow-lg transition-shadow duration-300">
					<motion.div
						className={`overflow-hidden text-nowrap font-bold text-white flex-1 w-full text-center ${isSmallMobile ? "text-normal3" : "text-normal2"} 
							mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer`}
						animate={{
							width: hoveredButton === "left" ? "0%" : "100%",
							borderTopLeftRadius:
								hoveredButton === "right" ? "8px" : "0px",
							borderBottomLeftRadius:
								hoveredButton === "right" ? "8px" : "0px",
							opacity:
								hoveredButton === "left" && !isMobile ? 0 : 1,
							translateY: hoveredButton === "right" ? -1 : 0,
							scale: hoveredButton === "right" ? 1.05 : 1,
						}}
						initial={{
							width: !isMobile ? "50%" : "80%",
							right: "0%",
						}}
						transition={{
							duration: 0.3,
							ease: "easeInOut",
						}}
						onClick={onRedirectClick}
					>
						Takeaway
					</motion.div>
				</div>
			) : (
				<div className="relative w-full max-w-lg h-full">
					{/* Left Button */}
					<motion.button
						className="absolute h-full rounded-l-lg overflow-hidden flex items-center border-2 border-primary"
						style={{
							originX: 1,
							zIndex: hoveredButton === "left" ? 10 : 5,
						}}
						animate={{
							width:
								hoveredButton === "right"
									? "10%"
									: !isMobile
										? "40%"
										: "25%",
							left:
								hoveredButton === "right"
									? !isMobile
										? "40%"
										: "25%"
									: "0%",
							borderTopRightRadius:
								hoveredButton === "right" ? "8px" : "0px",
							borderBottomRightRadius:
								hoveredButton === "right" ? "8px" : "0px",
						}}
						initial={{
							width: !isMobile ? "40%" : "25%",
							left: "0%",
						}}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						onMouseEnter={() => setHoveredButton("left")}
						onMouseLeave={() => setHoveredButton(null)}
						onClick={onBlogClick}
					>
						<div className="flex items-center justify-between w-full">
							<motion.div
								className="overflow-hidden text-nowrap text-normal2 font-bold text-grey mx-auto"
								animate={{
									width:
										hoveredButton === "right"
											? "0%"
											: "100%",
									borderTopLeftRadius:
										hoveredButton === "left"
											? "8px"
											: "0px",
									borderBottomLeftRadius:
										hoveredButton === "left"
											? "8px"
											: "0px",
									translateY:
										hoveredButton === "left" ? -1 : 0,
									scale: hoveredButton === "left" ? 1.05 : 1,
								}}
								initial={{ width: "100%", right: "0%" }}
								transition={{
									duration: 0.3,
									ease: "easeInOut",
								}}
							>
								{isMobile ? (
									<div className="w-full flex justify-center">
										<MapPinIcon />
									</div>
								) : (
									"Location"
								)}
							</motion.div>
						</div>
					</motion.button>

					{/* Right Button */}
					<motion.button
						className="absolute h-full w-fit rounded-r-lg overflow-hidden flex items-center bg-primary "
						style={{
							originX: 0,
							zIndex: hoveredButton === "right" ? 10 : 5,
						}}
						animate={{
							width:
								hoveredButton === "left"
									? !isMobile
										? "18%"
										: "75%"
									: !isMobile
										? "60%"
										: "75%",
							right:
								hoveredButton === "left"
									? !isMobile
										? "42%"
										: "0%"
									: "0%",
							borderTopLeftRadius:
								hoveredButton === "right" ? "8px" : "0px",
							borderBottomLeftRadius:
								hoveredButton === "right" ? "8px" : "0px",
						}}
						initial={{
							width: !isMobile ? "60%" : "75%",
							right: "0%",
						}}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						onMouseEnter={() => setHoveredButton("right")}
						onMouseLeave={() => setHoveredButton(null)}
					>
						<div className="flex items-center justify-between w-full">
							<motion.div
								className={`overflow-hidden text-nowrap font-bold text-white flex-1 mx-auto ${isMobile ? "text-normal3" : "text-normal2"}`}
								animate={{
									width:
										hoveredButton === "left"
											? "0%"
											: "100%",
									borderTopLeftRadius:
										hoveredButton === "right"
											? "8px"
											: "0px",
									borderBottomLeftRadius:
										hoveredButton === "right"
											? "8px"
											: "0px",
									opacity:
										hoveredButton === "left" && !isMobile
											? 0
											: 1,
									translateY:
										hoveredButton === "right" ? -1 : 0,
									scale: hoveredButton === "right" ? 1.05 : 1,
								}}
								initial={{
									width: !isMobile ? "50%" : "80%",
									right: "0%",
								}}
								transition={{
									duration: 0.3,
									ease: "easeInOut",
								}}
								onClick={onRedirectClick}
							>
								Takeaway
							</motion.div>
							<div
								className={`flex justify-end m-[5px] ${isMobile ? "hidden" : ""}`}
							>
								<div className="w-[31px] h-[31px] bg-black/25 rounded-[7px] flex items-center justify-center">
									<svg
										className="w-6 h-6 text-white -rotate-45"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M14 5l7 7m0 0l-7 7m7-7H3"
										/>
									</svg>
								</div>
							</div>
						</div>
					</motion.button>
				</div>
			)}
		</div>
	);
};
