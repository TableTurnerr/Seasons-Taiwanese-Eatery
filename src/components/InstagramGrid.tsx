import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundGradient } from "./ui/background-gradient";
import { PostDescription } from "./PostDescription";

interface InstagramPost {
	id: string;
	title: string;
	image: string;
	url: string;
	description?: string | string[];
}

interface InstagramGridProps {
	posts: InstagramPost[];
}

const InstagramIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			className="bi bi-instagram"
			viewBox="0 0 16 16"
		>
			<path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
		</svg>
	);
};

const InstagramGrid: React.FC<InstagramGridProps> = ({ posts }) => {
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	// Get current number of columns based on screen size
	const getColumnsCount = () => {
		if (typeof window !== "undefined") {
			if (window.innerWidth < 640) return 1;
			if (window.innerWidth < 968) return 2;
			return 3;
		}
		return 3;
	};

	const [columns, setColumns] = useState(3);

	React.useEffect(() => {
		const handleResize = () => {
			const newColumns = getColumnsCount();
			setColumns(newColumns);
		};

		// Set initial columns
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Ensure we have exactly 9 posts (pad with empty slots if needed)
	const gridPosts = [...posts];
	while (gridPosts.length < 9) {
		gridPosts.push({
			id: `empty-${gridPosts.length}`,
			title: "",
			image: "",
			url: "",
		});
	}
	const displayPosts = gridPosts.slice(0, 9);

	// Organize posts into columns
	const organizeIntoColumns = () => {
		const cols: InstagramPost[][] = Array.from(
			{ length: columns },
			() => [],
		);
		displayPosts.forEach((post, index) => {
			const colIndex = index % columns;
			cols[colIndex].push(post);
		});
		return cols;
	};

	const columnPosts = organizeIntoColumns();

	const getHoveredColumnIndex = () => {
		if (!hoveredId) return -1;
		const postIndex = displayPosts.findIndex(
			(post) => post.id === hoveredId,
		);
		return postIndex >= 0 ? postIndex % columns : -1;
	};

	const hoveredColumnIndex = getHoveredColumnIndex();

	return (
		<div className="flex gap-4 mx-auto p-6">
			{columnPosts.map((columnData, columnIndex) => (
				<motion.div
					key={columnIndex}
					className="flex-1 flex flex-col gap-4"
					style={{ height: "100%" }}
				>
					{columnData.map((post, postIndex) => {
						// Skip rendering empty slots
						if (!post.image) return null;

						const isHovered = post.id === hoveredId;
						const isInHoveredColumn =
							hoveredColumnIndex === columnIndex;
						const shouldCompress = isInHoveredColumn && !isHovered;

						// Calculate heights to maintain consistent spacing
						const baseHeight = 350;
						const expandedHeight = 450;
						const compressedHeight = 300;

						let currentHeight = baseHeight;
						if (isHovered) {
							currentHeight = expandedHeight;
						} else if (shouldCompress) {
							currentHeight = compressedHeight;
						}

						return (
							<motion.div
								key={post.id}
								className="relative rounded-lg shadow-lg cursor-pointer bg-white border border-primary-dark"
								onMouseEnter={() => setHoveredId(post.id)}
								onMouseLeave={() => setHoveredId(null)}
								animate={{
									height: currentHeight,
								}}
								transition={{
									duration: 0.4,
									ease: [0.4, 0, 0.2, 1],
								}}
								whileHover={{ scale: 1.02 }}
								onClick={() => window.open(post.url, "_blank")}
								style={{
									flexShrink: 0,
								}}
							>
								<div className="absolute top-0 right-0 w-full h-full bg-primary blur-xl opacity-5 hover:opacity-100 -z-20" />
								{/* Image Container */}
								<motion.div
									className="relative h-full overflow-hidden rounded-lg"
									animate={{
										height:
											isHovered || shouldCompress
												? "100%"
												: "90%",
									}}
									transition={{
										duration: 0.4,
										ease: [0.4, 0, 0.2, 1],
									}}
								>
									<motion.img
										src={post.image}
										alt={post.title}
										className="w-full h-full object-cover rounded-lg"
										animate={{
											scale: isHovered ? 1.1 : 1,
										}}
										transition={{
											duration: 0.4,
											ease: [0.4, 0, 0.2, 1],
										}}
									/>

									{/* Gradient overlay */}
									<motion.div
										className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20"
										animate={{
											opacity: isHovered ? 0.8 : 0.0,
										}}
										transition={{ duration: 0.3 }}
									/>
								</motion.div>

								{/* Content Container */}
								<motion.div
									className="absolute bottom-0 left-0 right-0 px-4 text-white z-30 w-full rounded-lg"
									animate={{
										opacity: shouldCompress ? 0 : 1,
										color: isHovered ? "white" : "black",
										// backgroundColor: !isHovered
										// 	? "#ffffff"
										// 	: "transparent",
									}}
									transition={{ duration: 0.2 }}
								>
									<motion.div
										className="leading-tight w-full flex justify-between"
										animate={{
											fontSize: isHovered
												? "24px"
												: "18px",
											marginBottom: isHovered
												? "5px"
												: "5px",
											textWrap: isHovered
												? "pretty"
												: "nowrap",
										}}
										transition={{ duration: 0.2 }}
										style={{}}
									>
										{post.title.length > 28 && !isHovered
											? post.title.slice(0, 28) + " ..."
											: post.title}

										<motion.div
											animate={{
												opacity: isHovered ? 0 : 0.9,
											}}
											transition={{ duration: 0.3 }}
											className="ml-2 h-full flex self-center"
										>
											<InstagramIcon />
										</motion.div>
									</motion.div>

									<AnimatePresence>
										{isHovered && post.description && (
											<motion.div
												className="text-normal4 text-white mb-[5px]"
												initial={{
													opacity: 0,
													height: 0,
												}}
												animate={{
													opacity: 1,
													height: "auto",
												}}
												exit={{ opacity: 0, height: 0 }}
												transition={{
													duration: 0.3,
													delay: 0.1,
												}}
												hidden={!isHovered}
											>
												<PostDescription
													description={
														post.description
													}
												/>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							</motion.div>
						);
					})}
				</motion.div>
			))}
		</div>
	);
};

export default InstagramGrid;
