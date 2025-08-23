// components/LatestBlogs.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/firebaseConfig";
import {
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	Timestamp,
	where,
} from "firebase/firestore";
import Image from "next/image";
import { BackgroundGradient } from "./ui/background-gradient";
import ThemeButton from "./ThemeBtn";
import { useIsMobile } from "@/constants/IsMobile";

interface BlogPost {
	id: string;
	title: string;
	coverImage?: string;
	createdAt: Timestamp;
	archived?: boolean;
}

interface LatestBlogsProps {
	maxPosts?: number;
	showTitle?: boolean;
	className?: string;
}

const Home_blogs: React.FC<LatestBlogsProps> = ({
	maxPosts = 5,
	showTitle = true,
	className = "",
}) => {
	const { isSmallMobile } = useIsMobile();

	const [blogs, setBlogs] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const restaurantId = process.env.NEXT_PUBLIC_FIREBASE_RESTAURANT_ID;

	useEffect(() => {
		const fetchLatestBlogs = async () => {
			if (!restaurantId) {
				setError("Restaurant ID not configured");
				setLoading(false);
				return;
			}

			try {
				setLoading(true);

				const blogsCollectionRef = collection(
					db,
					`Restaurants/${restaurantId}/blogs`,
				);

				// Optimized query: only fetch non-archived blogs, limit results, order by creation date
				const q = query(
					blogsCollectionRef,
					where("archived", "!=", true), // Exclude archived blogs
					orderBy("archived"), // Required for inequality filter
					orderBy("createdAt", "desc"),
					limit(maxPosts),
				);

				const querySnapshot = await getDocs(q);

				const fetchedBlogs: BlogPost[] = [];
				querySnapshot.forEach((doc) => {
					const data = doc.data();

					// Skip the specific blog ID you want to exclude
					if (doc.id === "HhrqYszvCsMXXo2gywSO") return;

					fetchedBlogs.push({
						id: doc.id,
						title: data.title || "Untitled Post",
						coverImage: data.coverImage,
						createdAt: data.createdAt as Timestamp,
						archived: data.archived || false,
					});
				});

				setBlogs(fetchedBlogs);
			} catch (err) {
				console.error("Error fetching latest blogs:", err);

				// Fallback query without the where clause if the above fails
				try {
					const fallbackQuery = query(
						collection(db, `Restaurants/${restaurantId}/blogs`),
						orderBy("createdAt", "desc"),
						limit(maxPosts),
					);

					const fallbackSnapshot = await getDocs(fallbackQuery);
					const fallbackBlogs: BlogPost[] = [];

					fallbackSnapshot.forEach((doc) => {
						const data = doc.data();

						// Skip archived blogs and specific excluded blog
						if (data.archived || doc.id === "HhrqYszvCsMXXo2gywSO")
							return;

						fallbackBlogs.push({
							id: doc.id,
							title: data.title || "Untitled Post",
							coverImage: data.coverImage,
							createdAt: data.createdAt as Timestamp,
							archived: data.archived || false,
						});
					});

					setBlogs(fallbackBlogs);
				} catch (fallbackErr) {
					console.error("Fallback query also failed:", fallbackErr);
					setError("Failed to load latest blogs");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchLatestBlogs();
	}, [restaurantId, maxPosts]);

	if (loading) {
		return (
			<div className={`${className}`}>
				{showTitle && (
					<h2 className="text-h2 text-black mb-8 text-center flex justify-between px-8">
						Our Blogs
					</h2>
				)}
				<div
					className="gap-6 overflow-x-scroll p-4 flex flex-row no-scrollbar"
					style={{
						width: "calc(100% + 20px)",
						transform: "translateX(-10px)",
					}}
				>
					{Array.from({ length: maxPosts }).map((_, index) => (
						<div
							key={index}
							className="rounded-xl bg-white shadow-lg overflow-hidden animate-pulse min-w-[300px]"
						>
							<div className="h-48 bg-gray-200"></div>
							<div className="p-4">
								<div className="h-6 bg-gray-200 rounded mb-2"></div>
								<div className="h-4 bg-gray-200 rounded w-3/4"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={`text-center py-8 ${className}`}>
				<p className="text-red-500">Unable to load latest blogs</p>
			</div>
		);
	}

	if (blogs.length === 0) {
		return (
			<div className={`text-center py-8 ${className}`}>
				{showTitle && (
					<h2 className="text-h2 text-black mb-8 text-center flex justify-between px-8">
						Our Blogs
					</h2>
				)}
				<p className="text-grey text-normal1">
					No blog posts available
				</p>
			</div>
		);
	}

	return (
		<div className={`${className}`}>
			<div className="w-full flex justify-between">
				<h2 className="text-h4 text-nowrap sm:text-h2 font-semibold sm:font-normal text-black text-center flex justify-between px-8">
					Our Blogs
				</h2>
				<div className="text-center transform transition-all duration-1000 mx-4 justify-self-end">
					{/* <BackgroundGradient>
						<Link
							href="/blogs"
							className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:from-primary-dark hover:to-primary transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
						>
							<span className="mr-2 hidden sm:flex">
								View All Blogs
							</span>
							<svg
								className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13 7l5 5-5 5M6 12h12"
								/>
							</svg>

							<div className="absolute inset-0 border-2 border-white/30 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
						</Link>
					</BackgroundGradient> */}

					{!isSmallMobile && (
						<div className="h-full items-center flex">
							<ThemeButton
								href="/blogs"
								textClassname="pr-[8px] pl-[14px]"
								arrowRotation={0}
								iconColor="text-white group-hover:translate-x-[2px] transition-transform duration-300"
								className="rounded-full"
								iconBgColor="bg-white/10 rounded-full"
								text="View All Blogs"
							/>
						</div>
					)}
				</div>
			</div>

			<div
				className="gap-6 overflow-x-auto p-4 sm:px-12 flex flex-row no-scrollbar"
				style={{
					width: "calc(100% + 20px)",
					transform: "translateX(-10px)",
				}}
			>
				{blogs.map((blog, index) => (
					<Link
						key={blog.id}
						href={`/blogs/${blog.id}`}
						className="rounded-xl  min-w-[300px] max-w-[400px] group"
					>
						<article className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-x-hidden transform hover:-translate-y-1">
							<div className="relative w-full h-48">
								{blog.coverImage ? (
									<Image
										src={blog.coverImage}
										alt={blog.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
										priority={index === 0} // Only prioritize the first image
										unoptimized={true}
									/>
								) : (
									<div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
										<svg
											className="h-12 w-12 text-gray-400"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={1.5}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
											/>
										</svg>
									</div>
								)}
							</div>

							<div className="p-4">
								<h3
									className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300"
									title={blog.title}
								>
									{blog.title}
								</h3>

								<p className="text-xs text-gray-500 mb-3">
									{blog.createdAt
										?.toDate()
										.toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
								</p>

								<span className="inline-flex items-center text-primary text-sm font-medium group-hover:underline">
									Read More
									<svg
										className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</span>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
							</div>
						</article>
					</Link>
				))}
			</div>

			{isSmallMobile && (
				<div className="h-full items-center flex w-full justify-end mt-4">
					<ThemeButton
						href="/blogs"
						textClassname="pr-[4px] pl-[7px]"
						arrowRotation={0}
						iconColor="text-white group-hover:translate-x-[2px] transition-transform duration-300"
						className="rounded-full"
						iconBgColor="bg-white/10 rounded-full"
						text="All Blogs"
					/>
				</div>
			)}
		</div>
	);
};

export default Home_blogs;
