import React, { useState, useEffect, useRef, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const InstagramCarousel: React.FC<InstagramGridProps> = ({ posts }) => {
	const [slideHeight, setSlideHeight] = useState<number>(400);
	const [currentSlide, setCurrentSlide] = useState(0);
	const sliderRef = useRef<Slider>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);

	const calculateSlideHeight = useCallback((containerWidth: number) => {
		let newSlideHeight = 400;

		if (containerWidth < 480) {
			newSlideHeight = containerWidth;
		} else if (containerWidth < 768) {
			newSlideHeight = containerWidth * 0.8;
		} else {
			newSlideHeight = 400;
		}
		setSlideHeight(newSlideHeight);
	}, []);

	const handleVisibility = useCallback((isVisible: boolean) => {
		if (isVisible) {
			autoScrollRef.current = setInterval(() => {
				if (sliderRef.current) {
					sliderRef.current.slickNext();
				}
			}, 5000);
		} else if (autoScrollRef.current) {
			clearInterval(autoScrollRef.current);
		}
	}, []);

	useEffect(() => {
		const handleResize = () => {
			const containerWidth =
				sliderRef.current?.innerSlider?.list?.offsetWidth ||
				window.innerWidth * 0.95;
			calculateSlideHeight(containerWidth);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [calculateSlideHeight]);

	useEffect(() => {
		if (!containerRef.current) return;

		observerRef.current = new IntersectionObserver(
			([entry]) => handleVisibility(entry.isIntersecting),
			{ threshold: 0.3 },
		);

		observerRef.current.observe(containerRef.current);

		return () => {
			if (autoScrollRef.current) clearInterval(autoScrollRef.current);
			observerRef.current?.disconnect();
		};
	}, [handleVisibility]);

	const defaultSliderSettings = {
		infinite: posts.length > 1,
		dots: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		beforeChange: (_: number, next: number) => setCurrentSlide(next),
		responsive: [
			{
				breakpoint: 1440,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows: true,
					infinite: posts.length > 2,
				},
			},
			{
				breakpoint: 1080,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: true,
					infinite: posts.length > 2,
				},
			},
			{
				breakpoint: 718,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					infinite: posts.length > 1,
				},
			},
		],
		afterChange: () => {
			if (sliderRef.current) {
				// Access the slider's list element more safely
				const listElement = sliderRef.current.innerSlider?.list;
				if (listElement) {
					calculateSlideHeight(listElement.offsetWidth);
				}
			}
		},
		onInit: () => {
			if (sliderRef.current) {
				const listElement = sliderRef.current.innerSlider?.list;
				if (listElement) {
					calculateSlideHeight(listElement.offsetWidth);
				}
			}
		},
	};

	if (!posts || posts.length === 0) {
		return <p>No Instagram posts to display.</p>;
	}

	return (
		<div
			ref={containerRef}
			className="instagram-carousel-container w-[95%] mx-auto"
		>
			<Slider ref={sliderRef} {...defaultSliderSettings}>
				{posts.map((post, index) => (
					<div
						key={index}
						className="instagram-slide flex justify-center items-center h-full"
						style={{
							display: "flex",
							justifyContent: "center",
							// height: `${slideHeight}px`,
							alignItems: "center",
						}}
					>
						<div
							style={{
								width: "100%",
								maxWidth: "",
								height: "auto",
							}}
							className="instagram-embed-container flex justify-center items-center"
						>
							<InstagramPostCard post={post} />
						</div>
					</div>
				))}
			</Slider>
			<style jsx global>{`
				.slick-prev,
				.slick-next {
					z-index: 1;
					height: 40px;
					width: 40px;
				}
				.slick-prev:before,
				.slick-next:before {
					font-size: 30px;
					color: #b00c13;
					opacity: 0.5;
				}
				.slick-prev:hover:before,
				.slick-next:hover:before {
					opacity: 1;
				}
				.slick-prev {
					left: -15px;
				}
				.slick-next {
					right: -15px;
				}

				@media (max-width: 770px) {
					.slick-prev {
						display: hidden;
					}

					.slick-next {
						display: hidden;
					}
				}

				@media (max-width: 720px) {
					.slick-prev {
						left: -15px;
					}

					.slick-next {
						right: -15px;
					}
				}

				.slick-dots {
					bottom: -50px;
					color: #fff;
				}

				.slick-slide {
					display: inline-block;
					vertical-align: middle;
					height: 100%;
				}
				.slick-slide > div {
					margin: 0 10px;
					height: 100%;
					display: flex;
					align-items: center;
				}
				.slick-list {
					margin: 0 -10px;
				}

				.slick-track {
					display: flex;
					align-items: stretch;
					height: 100%;
				}

				.react-instagram-embed-frame {
					height: 100% !important;
				}
			`}</style>
		</div>
	);
};

export default InstagramCarousel;

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

// Static post component without animations
const InstagramPostCard: React.FC<{ post: InstagramPost; height?: number }> = ({
	post,
	height = 550,
}) => {
	if (!post.image) return null;

	return (
		<div
			className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer bg-white border border-gray-300"
			onClick={() => window.open(post.url, "_blank")}
			style={{
				maxWidth: "75vw",
				minWidth: "200px",
				height: "100%",
			}}
		>
			{/* Image Container */}
			<div className="relative overflow-hidden">
				<img
					src={post.image}
					alt={post.title}
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>

			{/* Content Container */}
			<div className="px-4 text-black z-30 w-full bg-white bg-opacity-90 py-2">
				<div className="leading-tight w-full flex justify-between items-center">
					<span className="text-lg font-medium">{post.title}</span>
					<InstagramIcon />
				</div>

				<PostDescription description={post.description} />
			</div>
		</div>
	);
};
