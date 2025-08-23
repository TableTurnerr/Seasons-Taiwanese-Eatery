"use client";

import Header from "@/components/Header";
import Image from "next/image";

import Hero from "@/../public/Images/hero.webp";

import ThemeButton from "@/components/ThemeBtn";
import Home_menu_section from "@/components/Home_menu_section";
import Reviews from "@/components/Reviews";
import FAQSection from "@/components/FAQ_section";
import LocationComponent from "@/components/OurLocation";
import Featuring from "@/components/featuring";
import { useEffect, useRef, useState } from "react";
import SubscriptionPopup, {
	PopupConfig,
} from "../components/SubscriptionPopup"; // Import new popup and config type
import Story from "@/components/Story";
import { usePathname } from "next/navigation";
import InstagramComponent from "@/components/InstagramComponent";
import Home_blogs from "@/components/Home_blogs";
import { useIsMobile } from "@/constants/IsMobile";
import { MapPinIcon, TakeAwayIcon } from "@/components/CTA_header_btn";
import SubscriptionArea from "@/components/SubscriptionArea";
import PwaHandler from "@/lib/PwaHandler";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Home() {
	const videoSrc = `/vids/seasons.mp4`;
	let videoType: string | undefined;
	const extension = videoSrc.split(".").pop()?.toLowerCase();
	if (extension === "mp4") videoType = "video/mp4";
	else if (extension === "webm") videoType = "video/webm";
	else if (extension === "ogv" || extension === "ogg")
		videoType = "video/ogg";

	const pathname = usePathname();

	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
			const sectionId = hash.replace("#", "");
			const section = document.getElementById(sectionId);
			if (section) {
				setTimeout(() => {
					section.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}, 100);
			}
		}
	}, [pathname]);

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [popupConfig, setPopupConfig] = useState<PopupConfig | null>(null);

	// Define the constant redirect URL
	const mealKeywayOrderUrl =
		"https://order.mealkeyway.com/customer/release/index?mid=674a336c694d346a53507453652b6d614b742b7345673d3d&utm_source=google&rwg_token=AAiGsoYpD58QwquOM6IMU90kRl7Z3Vb_vkjRnP4hMqMNDNB4aFqMwAmKRhCCAe8TPcMRH72Qc2irT-q3EAOXEg1OP0_L8QaiuA%3D%3D#/main";

	const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent("100 N Beretania St #109, Honolulu, HI 96817")}&t=&z=15&ie=UTF8`;

	const redirectPopupConfig: PopupConfig = {
		mode: "redirect",
		title: "WARNING!!!",
		message: "Entering Your Email May Cause Serious Regular Cravings",
		submitButtonText: "Spice Me Up!",
		targetUrl: mealKeywayOrderUrl, // Target URL for redirect mode
	};

	const handleRedirectFlowClick = () => {
		const alreadySubscribed =
			localStorage.getItem("newsletterSubscribed") === "true";

		if (alreadySubscribed) {
			console.log("Button: Already subscribed, redirecting...");
			window.location.href = mealKeywayOrderUrl;
		} else {
			console.log("Button: Opening redirect popup...");
			setPopupConfig(redirectPopupConfig);
			setIsPopupOpen(true);
		}
	};

	const { isSmallMobile, isMobile } = useIsMobile();
	const [CTA_hovered, setCTA_hovered] = useState(false);

	return (
		<div className="p-[10px] pb-0">
			<div className="sm:h-[20px]" />

			{/* hero img section */}
			<div
				id="Home"
				className="relative h-[550px] w-full overflow-hidden rounded-[36px] sm:h-[500px]"
			>
				<div className="flex h-full flex-col items-start justify-end gap-2.5 bg-black/55 px-[20px] pb-8 backdrop-blur-[13px] sm:px-[40px]">
					<div className="text-normal1 sm:text-normal2 border-l-3 border-white pl-[20px] text-white sm:font-bold">
						Serving Best Taiwanese Food Since 1994
					</div>

					<div className="font-creato-black sm:text-h2 lg:text-h1 text-[32px] leading-[1.2] font-semibold text-white sm:font-medium">
						Savor the Best
						<br />
						Taiwanese Food in&nbsp;
						<br className="hidden md:block" />
						Honolulu – Authentic
						<br />
						Taiwanese Food Near You!
					</div>

					<div className="text-white text-normal1 font-medium flex flex-row items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="46"
							height="44"
							viewBox="0 0 46 44"
							fill="none"
						>
							<g filter="url(#filter0_d_2179_2112)">
								<path
									d="M23 10L25.9187 18.9828H35.3637L27.7225 24.5344L30.6412 33.5172L23 27.9656L15.3588 33.5172L18.2775 24.5344L10.6363 18.9828H20.0813L23 10Z"
									fill="white"
								/>
							</g>
							<defs>
								<filter
									id="filter0_d_2179_2112"
									x="0.63623"
									y="0"
									width="44.7275"
									height="43.5172"
									filterUnits="userSpaceOnUse"
									color-interpolation-filters="sRGB"
								>
									<feFlood
										flood-opacity="0"
										result="BackgroundImageFix"
									/>
									<feColorMatrix
										in="SourceAlpha"
										type="matrix"
										values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
										result="hardAlpha"
									/>
									<feOffset />
									<feGaussianBlur stdDeviation="5" />
									<feComposite
										in2="hardAlpha"
										operator="out"
									/>
									<feColorMatrix
										type="matrix"
										values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
									/>
									<feBlend
										mode="normal"
										in2="BackgroundImageFix"
										result="effect1_dropShadow_2179_2112"
									/>
									<feBlend
										mode="normal"
										in="SourceGraphic"
										in2="effect1_dropShadow_2179_2112"
										result="shape"
									/>
								</filter>
							</defs>
						</svg>
						<div className="flex-row ">
							<span className="font-bold">4.7</span> from 341
							reviews across all platforms
						</div>
						<div className="gap-2 flex items-center">
							<div
								onClick={() =>
									(window.location.href =
										"https://www.yelp.com/biz/seasons-taiwanese-eatery-honolulu")
								}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<g clip-path="url(#clip0_2179_2123)">
										<path
											d="M20.4 0H3.6C1.61177 0 0 1.61177 0 3.6V20.4C0 22.3882 1.61177 24 3.6 24H20.4C22.3882 24 24 22.3882 24 20.4V3.6C24 1.61177 22.3882 0 20.4 0Z"
											fill="#D32323"
										/>
										<path
											d="M7.125 14.5781C7.125 14.5781 6.375 14.7187 6.28125 13.9687C6.1875 13.2187 6.28125 12.0937 6.5625 11.3906C6.84375 10.6874 7.5 10.9687 7.5 10.9687L10.5469 12.4687C10.5469 12.4687 11.4375 13.0781 10.4062 13.7343M12.0938 15.0468C12.0938 15.0468 11.8125 14.1093 10.9688 14.6718L8.67188 17.2031C8.67188 17.2031 8.20312 17.8124 8.8125 18.2343C9.42188 18.6562 10.4531 19.1249 11.3438 19.1718C12.2344 19.2187 12.0469 18.5156 12.0469 18.5156M13.9688 13.8281C13.9688 13.8281 13.0312 13.7812 13.1719 14.7187L15.0469 17.7187C15.0469 17.7187 15.5156 18.2812 15.9844 17.9531C16.4531 17.6249 17.2969 16.6406 17.6719 15.8437C18.0469 15.0468 17.25 14.9062 17.25 14.9062M13.2656 11.8124C13.2656 11.8124 12.9844 12.7031 13.9688 12.7968L17.3438 11.8593C17.3438 11.8593 18.0469 11.5312 17.7656 10.9218C17.4844 10.3124 16.9219 9.37494 16.2188 8.81244C15.5156 8.24994 15.1875 8.95306 15.1875 8.95306M11.0625 11.2499C11.0625 11.2499 11.9062 11.8593 12.2344 10.8749V4.45306C12.2344 4.45306 12.2344 3.74994 11.4844 3.74994C10.7344 3.74994 8.85938 4.21869 8.10938 4.64056C7.35938 5.06244 7.82812 5.62494 7.82812 5.62494"
											fill="white"
										/>
									</g>
									<defs>
										<clipPath id="clip0_2179_2123">
											<rect
												width="24"
												height="24"
												fill="white"
											/>
										</clipPath>
									</defs>
								</svg>
							</div>
							<div
								onClick={() =>
									(window.location.href =
										" https://www.google.com/search?sca_esv=a3e392cc0b6211b6&sxsrf=AE3TifMSfvuUaZT0ild8Q288ZveBrm5Pww:1752463479797&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EyqBFA2Nibd6uhT3fWUIHE6F2r8-4UKqb9l5Aa_z3jhQCKFeIG_ayfJbQXBdLrjwTSoQWi0HqSKnfS4QOi9hNE5EhubwleSHE3Ay8MhM5c7kz34KYQYaYeSSMU_DVIARG1QRG34%3D&q=Seasons+Taiwanese+Eatery+%E7%BB%A3%E8%98%AD%E7%AB%B9%E8%8B%91+Reviews&sa=X&ved=2ahUKEwi32MeZs7uOAxWATKQEHQoLIMIQ0bkNegQIQRAE&biw=1422&bih=702&dpr=1.35")
								}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<rect
										width="24"
										height="24"
										rx="3"
										fill="white"
									/>
									<path
										d="M20.5382 12.1525C20.5382 11.4357 20.48 10.9126 20.3541 10.3702H12.1689V13.6055H16.9735C16.8766 14.4095 16.3536 15.6203 15.1911 16.4339L15.1749 16.5423L17.7629 18.5472L17.9422 18.5651C19.5889 17.0442 20.5382 14.8066 20.5382 12.1525Z"
										fill="#4285F4"
									/>
									<path
										d="M12.1689 20.6767C14.5227 20.6767 16.4988 19.9017 17.9421 18.565L15.1911 16.4339C14.455 16.9473 13.4669 17.3057 12.1689 17.3057C9.86352 17.3057 7.90684 15.785 7.20933 13.683L7.1071 13.6917L4.41605 15.7743L4.38086 15.8721C5.81446 18.72 8.7592 20.6767 12.1689 20.6767Z"
										fill="#34A853"
									/>
									<path
										d="M7.20905 13.683C7.02501 13.1405 6.9185 12.5593 6.9185 11.9588C6.9185 11.3582 7.02501 10.777 7.19937 10.2345L7.19449 10.119L4.46973 8.00293L4.38058 8.04533C3.78972 9.22712 3.45068 10.5542 3.45068 11.9588C3.45068 13.3633 3.78972 14.6903 4.38058 15.8721L7.20905 13.683Z"
										fill="#FBBC05"
									/>
									<path
										d="M12.1689 6.61176C13.8059 6.61176 14.9102 7.31888 15.5398 7.90981L18.0002 5.50751C16.4892 4.10296 14.5227 3.24084 12.1689 3.24084C8.7592 3.24084 5.81446 5.19753 4.38086 8.04537L7.19965 10.2346C7.90684 8.13258 9.86352 6.61176 12.1689 6.61176Z"
										fill="#EB4335"
									/>
								</svg>
							</div>
						</div>
					</div>

					{isMobile && (
						<div className="flex gap-4">
							<div>
								<ThemeButton
									text="Location"
									textClassname="pr-[8px] pl-[14px]"
									onClick={handleRedirectFlowClick}
									href={mapUrl}
								/>
							</div>

							{/* <div>
								<ThemeButton
									text="Takeaway"
									textClassname="pr-[8px] pl-[14px]"
									textColor="text-grey"
									className="border-primary border-2 bg-white hover:bg-white"
									iconBgColor="bg-black/5"
									iconBgHoverColor="bg-primary-dark/10"
									iconColor="text-primary"
									href="https://m.yelp.com/reservations/seasons-taiwanese-eatery-honolulu?covers=2&date=2025-05-20&source=yelp_biz&time=1900 "
									Icon={<TakeAwayIcon />}
									animate={true}
									showArrow={false}
								/>
							</div> */}
						</div>
					)}

					<Image
						src={Hero}
						alt="Seasons Taiwanese Eatery"
						className="absolute top-0 left-0 -z-10 h-full w-full rounded-[36px] object-cover"
					/>
					<div className="absolute top-0 left-0 -z-9 h-full w-full rounded-[36px] bg-black/20 object-cover" />
					<div
						className="absolute top-0 left-0 -z-9 h-full w-full rounded-[36px] object-cover"
						style={{
							background:
								"linear-gradient(59deg, rgb(13 13 13 / 30%) 20%, rgb(13 13 13 / 20%) 40%, rgb(13 13 13 / 15%) 60%, rgba(0, 0, 0, 0) 100%)",
						}}
					/>
				</div>
			</div>

			<div className="h-[100px]" />

			{/* section 2 */}
			<div
				id="Menu"
				className="flex w-full flex-col items-center justify-center text-center"
			>
				<div className="text-h3 sm:text-h2 w-full text-black">
					Try our most popular items
				</div>
				<div className="text-normal text-grey mt-[20px]">
					Treat yourself to our must-try list that has everyone
					talking
				</div>
				<div className="mt-[20px] flex flex-col items-center justify-center gap-[20px] sm:flex-row">
					<ThemeButton
						text="View Full Menu"
						textClassname="pr-[8px] pl-[14px]"
						onClick={handleRedirectFlowClick}
						href={mealKeywayOrderUrl}
					/>

					<ThemeButton
						text="Reservations"
						textClassname="pr-[8px] pl-[14px]"
						textColor="text-grey"
						className="border-primary border-2 bg-white hover:bg-white"
						iconBgColor="bg-black/5"
						iconBgHoverColor="bg-primary-dark/10"
						iconColor="text-primary"
						href="https://m.yelp.com/reservations/seasons-taiwanese-eatery-honolulu?covers=2&date=2025-05-20&source=yelp_biz&time=1900 "
					/>
				</div>
			</div>

			<div className="h-[100px]" />

			{/* Menu Section */}

			<div>
				<Home_menu_section />
			</div>

			<div className="h-[100px]" />

			{/* Instagram Section */}
			<InstagramComponent />

			<div className="h-[100px]" />

			{/* reviews */}
			<div id="Reviews">
				<Reviews />
			</div>

			<div className="h-[100px]" />

			<Home_blogs />

			<div className="h-[100px]" />
			<div id="Featuring">
				<Featuring />
			</div>

			<div className="h-[100px]" />
			<div id="Story">
				<Story />
			</div>

			<div className="h-[100px]" />
			{/* FAQ */}
			<div id="FAQ's">
				<FAQSection />
			</div>

			<div className="h-[100px]" />
			{/* Subscribe */}
			<div
				id="Subscribe"
				className="sm:mx-[100px] gap-[30px] flex flex-col md:flex-row items-center justify-center "
			>
				<SubscriptionArea />
				<HoverBorderGradient
					className="bg-white"
					containerClassName="rounded-2xl"
					as={"div"}
				>
					<PwaHandler />
				</HoverBorderGradient>
			</div>

			<div className="h-[100px]" />
			{/* OUR LOCATION */}

			<div id="Location">
				<LocationComponent />
			</div>
		</div>
	);
}
