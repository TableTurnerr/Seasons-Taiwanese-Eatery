import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import family_tradition from "@/../public/Images/Our_Story_home_page.webp";
import Link from "next/link";

function Story() {
	const sectionVariants = {
		hidden: { opacity: 0, y: 50 }, // Start hidden, slightly below final position
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6, // Animation duration
				ease: "easeOut", // Animation easing
			},
		},
	};
	return (
		<motion.div // Wrap section in motion.div
			className="mt-16 md:mt-[100px] px-4 lg:px-[80px]"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
			variants={sectionVariants}
		>
			<div className="mx-auto w-full max-w-[1240px] flex flex-col lg:flex-row lg:justify-between items-center gap-8 lg:gap-0">
				<Image
					src={family_tradition} // Family Tradition Image
					alt="Story about the best Restaurant in Honolulu, Hawaii." // Changed alt text
					width={540}
					height={540}
					className="block lg:hidden aspect-square max-w-[540px] max-h-[540px] w-[60%] h-auto lg:w-[400px] lg:h-[400px] xl:w-[540px] xl:h-[540px] shrink-0 rounded-[24px] object-cover"
				/>
				<div className="flex w-full lg:w-fit max-w-[560px] flex-col items-center lg:items-start gap-[10px] md:gap-[20px] mt-8 lg:mt-0 lg:ml-5">
					<div className="self-stretch text-h4 sm:text-h3 xl:text-h2 text-black text-center lg:text-left">
						Story Behind Seasons Taiwanese Eatery
					</div>
					<div className="text-normal4 xl:text-normal3 text-grey text-center lg:text-left">
						More than just a restaurant, Seasons Taiwanese Eatery is
						a story passed down through generations, a delicious
						blend of a mother's passion and a son's heartfelt
						devotion.
						<br />
						<br />
						It began in August 1983, with a woman named Chen Xiulan
						– our Mom. Leaving her home in eastern Taiwan, her name
						"Xiulan" (蘭) would eventually blossom into the heart of
						our first venture, initially known as "Season's Ice and
						Eatery."
						<br />
						<br />
						Her journey was fueled by a mother's love, sparked by
						the simple joy of her children relishing good food and
						her own deep love for cooking. She yearned to share the
						authentic tastes of her homeland, a culinary legacy
						rooted in the principle of "only eating clean."{" "}
						<Link
							href={"/blogs/HhrqYszvCsMXXo2gywSO/"}
							className="text-primary"
						>
							read more
						</Link>
					</div>
				</div>
				<Image
					src={family_tradition} // Family Tradition Image
					alt="Story about the best Restaurant in Honolulu, Hawaii." // Changed alt text
					width={540}
					height={540}
					className="hidden lg:block aspect-square max-w-[540px] max-h-[540px] w-[60%] h-auto lg:w-[400px] lg:h-[400px] xl:w-[540px] xl:h-[540px] shrink-0 rounded-[24px] object-cover"
				/>
			</div>
		</motion.div>
	);
}

export default Story;
