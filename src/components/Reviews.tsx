"use client";

import Image from "next/image";
import ReviewCard from "./ReviewCard";
import pattern from "@/../public/Svgs/BG Pattern.svg";
import ThemeButton from "./ThemeBtn";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation, Mousewheel } from "swiper/modules";
import { useIsMobile } from "@/constants/IsMobile";

const Reviews = () => {
	// Storing review data in an array makes the JSX much cleaner.
	const reviewsData = [
		{
			starCount: 5,
			reviewText:
				"Third time visiting here this year (first time in the new location) and we absolutely love it! The food is authentic and homey! Just like what I can get at home in Taiwan.",
			reviewerName: "April Chu",
		},
		{
			starCount: 5,
			reviewText:
				"We ordered the beef noodle soup, dragon dumplings, tomato braised tofu, and fried green beans. All of the dishes were super tasty and flavorful! Highly recommend the dragon dumplings...",
			reviewerName: "Justin Nakagawa",
		},
		{
			starCount: 5,
			reviewText:
				"When searching up a restaurant near Nuuanu I was slightly skeptical but very curious about a 5-star rated restaurant. This restaurant did not disappoint. ... The quality and flavors and freshness surprised me.",
			reviewerName: "Nina V",
		},
		{
			starCount: 5,
			reviewText:
				"I highly recommend you bring some friends so you can try more of the food! At a minimum you have to get the popcorn chicken and dragon dumplings.",
			reviewerName: "Sam Bader",
		},
		{
			starCount: 5,
			reviewText:
				"Absolutely love Seasons! One of my most favorite places to eat near my workplace and I’m sooo sad I didn’t bother to eat here sooner. ... Perfect expansion for one of my top 3 places to eat in Hawaii.",
			reviewerName: "Kylie Takashima",
		},
		{
			starCount: 5,
			reviewText:
				"My favorite Taiwanese/Chinese food in Honolulu. Not only is the food amazing, but the amout of food is huge and the prices are fair. The owner and staff are also friendly.",
			reviewerName: "Rebecca Huang",
		},
	];

	const { isSmallMobile } = useIsMobile();

	return (
		<>
			<style jsx global>{`
				/* Set the color for the navigation arrows */
				.swiper-button-next,
				.swiper-button-prev {
					color: #621e21; !important;
						
				}

				.swiper-pagination-bullet-active {
					background-color: #621e21 !important;
				}

				.swiper-pagination-bullet {
					background-color: #621321;
				}

				.swiper-button-prev {
                    left: 0px; /* Position at the edge of the padded container */
                }
                .swiper-button-next {
                    right: 0px; /* Position at the edge of the padded container */
                }

			`}</style>
			<div className="relative rounded-[36px] bg-black/10 self-stretch min-h-[644px] overflow-hidden">
				<Image
					src={pattern}
					alt="bg pattern"
					fill
					className="object-cover -z-20 opacity-50"
				/>

				<div className="py-[46px] px-[15px] sm:py-[76px] sm:px-[52px] flex flex-col items-center gap-[42px]">
					<div>
						<div className="text-h4 sm:text-h3 md:text-h2 font-bold text-primary-dark w-full text-center">
							What our Customers are Saying
						</div>
						<div className="sm:text-normal1 md:text-h5 text-primary-dark w-full text-center font-medium mt-[20px]">
							Check out our most recent reviews!
						</div>
					</div>

					<div
						className={`w-full ${isSmallMobile ? "h-[300px]" : "h-[250px]"} sm:h-[350px] rounded-2xl overflow-hidden`}
					>
						<div className="custom-swiper-button-prev absolute top-1/2 left-0 z-10 p-4 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</div>
						<div className="custom-swiper-button-next absolute top-1/2 right-0 z-10 p-4 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
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
						</div>
						<Swiper
							className="h-full"
							modules={[
								Autoplay,
								Pagination,
								Navigation,
								Mousewheel,
							]}
							loop={true}
							autoplay={{
								delay: 2000,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
							}}
							mousewheel={true}
							// Swiper will generate its own navigation buttons
							navigation={{
								nextEl: ".custom-swiper-button-next",
								prevEl: ".custom-swiper-button-prev",
							}}
							// Swiper will generate its own pagination
							pagination={{ clickable: true, enabled: true }}
							// Responsive Breakpoints
							slidesPerView={1}
							spaceBetween={20}
							breakpoints={{
								640: { slidesPerView: 2, spaceBetween: 30 },
								768: { slidesPerView: 2, spaceBetween: 30 },
								1024: { slidesPerView: 3, spaceBetween: 40 },
							}}
						>
							{reviewsData.map((review, index) => (
								<SwiperSlide key={index}>
									<ReviewCard
										starCount={review.starCount}
										reviewText={review.reviewText}
										reviewerName={review.reviewerName}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					<div className="z-10">
						<ThemeButton
							text="Give Us a Review"
							href="https://g.page/r/CQLXR1PKE02SEAI/review"
							textClassname="pr-[8px] pl-[14px]"
						/>
					</div>
				</div>
			</div>{" "}
		</>
	);
};

export default Reviews;
