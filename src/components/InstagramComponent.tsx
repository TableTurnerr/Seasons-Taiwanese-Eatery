import React, { useState, useEffect, useRef } from "react";
import InstagramGrid from "./InstagramGrid";
import InstagramCarousel from "./InstagramCarousel";

import instaPost1 from "@/../public/Images/insta/1.webp";
import instaPost2 from "@/../public/Images/insta/2.webp";
import instaPost3 from "@/../public/Images/insta/3.webp";
import instaPost4 from "@/../public/Images/insta/4.webp";
import instaPost5 from "@/../public/Images/insta/5.webp";
import instaPost6 from "@/../public/Images/insta/6.webp";
import instaPost7 from "@/../public/Images/insta/7.webp";
import instaPost8 from "@/../public/Images/insta/8.webp";
import instaPost9 from "@/../public/Images/insta/9.webp";

interface InstagramPost {
	id: string;
	title: string;
	image: string;
	url: string;
	description?: string | string[];
}

const InstagramFeed: React.FC<{ posts: InstagramPost[] }> = ({ posts }) => {
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 1200,
	);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="">
			<div className="lg:container mx-auto px-4">
				<h1 className="text-h3 sm:text-h2 text-black w-full text-center mb-[20px]">
					Instagram Feed
				</h1>

				{windowWidth > 650 ? (
					<InstagramGrid posts={posts} />
				) : (
					<InstagramCarousel posts={posts} />
				)}
			</div>
		</div>
	);
};

const InstagramComponent = () => {
	// const Posts: InstagramPost[] = [
	//   {
	//     id: '1',
	//     title: 'Pics by @mrbibingka',
	//     image: instaPost1.src,
	//     url: 'https://www.instagram.com/p/DHj1Vo6SyYt/?img_index=1',
	//     description: ''
	//   },
	//   {
	//     id: '2',
	//     title: 'Pupu menu: fried ika balls',
	//     image: instaPost2.src,
	//     url: 'https://www.instagram.com/p/B1KyvTWDaQt/',
	//   },
	//   {
	//     id: '3',
	//     title: 'Time for a bowl of beef noodle!!!',
	//     image: instaPost3.src,
	//     url: 'https://www.instagram.com/p/CbAz0T-J62v/'
	//   },
	//   {
	//     id: '4',
	//     title: 'Spicy beef noodle soup',
	// 		image: instaPost4.src,
	// 		url: 'https://www.instagram.com/p/B8132cGjcdM/',
	//     description: 'On a cold day like this, we need some spicy beef noodle soup!!! Or a hot day....either way...its ONO!!'
	//   },
	//   {
	//     id: '5',
	//     title: 'Chicken chicken 🐔 wings 😋 😍 💕 🙌 💖',
	// 		image: instaPost5.src,
	// 		url: 'https://www.instagram.com/p/CF2vO0TDcnR/',
	//     description:"Come and try our Taiwanese style crispy chicken wings!!! Original or Spicy, take your pick!!!",
	//   },
	//   {
	//     id: '6',
	//     title: 'The meat lover’s dream',
	// 		image: instaPost6.src,
	// 		url: 'https://www.instagram.com/p/B8J1FTdFA04/',
	//     description: "Oh yeah!!! The meat lover!!! It has beef, tendon, pork intestines, meatballs, and egg.. What's not to love???"
	//   },
	//   {
	//     id: '7',
	//     title: 'Beef noodle soup with egg to go!!!!',
	// 		image: instaPost7.src,
	// 		url: 'https://www.instagram.com/p/CKPiXdIDvXK/',
	//     description: '',
	//   },
	//   {
	//     id: '8',
	//     title: 'Pupu hour!!!! BYOB!!!',
	// 		image: instaPost8.src,
	// 		url: 'https://www.instagram.com/p/B04_CeDjITV/'
	//   },
	//   {
	//     id: '9',
	//     title: 'THE 5-3-1 DINNER DEAL',
	// 		image: instaPost9.src,
	// 		url: 'https://www.instagram.com/p/DIeveibCGpW/',
	//     description: [
	//                   'Party of 5, Gets 3 starters for Free, 1 Happy table',
	//                   'Pick your 3 Free Starter: Spicy Cucumbers🥒, Eggplants🍆, Braised Tofu, Kimchi, Fried Tofu',
	//                   'Applicable for Dinner Time 4:30-8:30 PM ONLY',
	//                   'Tag your people in the comments + Send a direct message for a reservation',
	//                   'You can also schedule pickup through our website!!! Link in bio',
	//                   'seasonseateryhi.com',
	//                   'LIMITED TIME OFFER GUYS!!!!.']
	//   }
	// ];

	const Posts: InstagramPost[] = [
		{
			id: "1",
			title: "jino_hawaii and 5 others",
			image: instaPost1.src,
			url: "https://www.instagram.com/p/DKlKQKdp8Sc/",
			description: "",
		},
		{
			id: "2",
			title: "Looking for Taiwanese food? Look no further than Seasons Taiwanese Eatery!",
			image: instaPost2.src,
			url: "https://www.instagram.com/p/DKgmjU1uejL/",
			description: [
				"Located in the Chinatown Cultural Plaza, Seasons offers great authentic Taiwanese food.",
				"MUST order dishes:",
				"🍿 popcorn chicken w/basil",
				"🍜 beef noodle SPICY",
				"🍤 pineapple shrimp",
			],
		},
		{
			id: "3",
			title: "hi_grindz and seasons_taiwanese_eatery",
			image: instaPost3.src,
			url: "https://www.instagram.com/p/DKNYBZjycvB/",
			description:
				"If you guys are looking for a good spot for Taiwanese food, check out @seasons_taiwanese_eatery 🤙. There was so much hype on this spot from the foodies so I had high expectations going in. The food was delicious all around but my faves were the popcorn chicken, beef noodle, oxtail, and beef crepe!",
		},
		{
			id: "4",
			title: "kellishiromabraiotta and 2 others",
			image: instaPost4.src,
			url: "https://www.instagram.com/p/DKGOor7vXzS/",
			description: [
				"🍖POV: You’re craving authentic Taiwanese cuisine",
				"📍 @seasons_taiwanese_eatery",
				"@seasons_taiwanese_eatery has been serving up authentic Taiwanese cuisine for more than 30 years.",
				"It’s most famous for its beef noodle soups, but the menu is huge and there’s lots to choose from.",
				"You can choose your desired spice level for many of the dishes.",
			],
		},
		{
			id: "5",
			title: "islandbag and 2 others",
			image: instaPost5.src,
			url: "https://www.instagram.com/p/CF2vO0TDcnR/",
			description: [
				"Drip drip! Like this pic if that's the sexiest drip you've ever seen 😍💦",
				"I was a big fan of the dragon dumplings, popcorn chicken, fried tofu, fried green beans and egg pancake roll.",
				"The black pepper beef noodle dish (not pictured) was also great and is a popular Taiwanese street food, but I think it's served only for dinner.",
				"A lot of people think the store closed, but it actually just moved around the corner, so go try it out if you were under thst impression 😆",
			],
		},
		{
			id: "6",
			title: "tobypicks_ and 5 others",
			image: instaPost6.src,
			url: "https://www.instagram.com/p/DJ3cJB3xO3J/",
			description: [
				"@seasons_taiwanese_eatery is Honolulu’s go to spot for Taiwanese cuisine. The hype of the Popcorn Chicken with Fried Basil is legit, but I’m also going to tell you that the Night Market Fried Rice is the real go to order here!",
				"Authentic taste with a variety of choices (they also have happy hour Mon-Sat 4:30-6:00), make this an excellent spot for your next lunch or dinner. Ample parking in the Chinatown Cultural Plaza.",
				"Other favorites include the Beef Noodle Soup, Braised Pork Belly, Pineapple Shrimp, Pepper Sauce Mushrooms and the Taiwanese Sausage.",
				"They also have a private room. Located across Legends in the Cultural Plaza.",
			],
		},
		{
			id: "7",
			title: "onosoahu and seasons_taiwanese_eatery",
			image: instaPost7.src,
			url: "https://www.instagram.com/p/DJ03sswRBmg/",
			description:
				"Have you tried this Taiwanese spot in Chinatown?🇹🇼🍜 Seasons Taiwanese Eatery is located in the Chinatown Cultural Plaza on the 1st floor, right across from Legends. What I really love about this place is their selection of side dishes—the popcorn chicken with fried basil was our fave!🤤 The dragon dumplings are also a must-try if you like that numbing spice from the Szechuan peppers. They're known for their noodles, which you can customize with spice levels from 1 to 5🔥—perfect for any spice lover. You can even add spice to the popcorn chicken for an extra kick🥵 They also have happy hour from 4:30 to 6, Monday through Saturday! 🅿️ Parking is $1 per 30 minutes in the plaza lot",
		},
		{
			id: "8",
			title: "bitelogic and seasons_taiwanese_eatery",
			image: instaPost8.src,
			url: "https://www.instagram.com/p/DJ0Rn8ZJar_/",
			description: [
				"I wish I knew about @seasons_taiwanese_eatery because it was so flavorful and scrumptious!! I’m a big fan of spicy food so everything was seasoned to perfection!",
				"I highly recommend the Taiwanese popcorn chicken, which I learned is a very popular street snack in Taiwan. The crispy basil paired so good with it!!",
			],
		},
		{
			id: "9",
			title: "oahufoodadventure and seasons_taiwanese_eatery",
			image: instaPost9.src,
			url: "https://www.instagram.com/p/DJfhrf9SdFS/",
			description: [
				"Lunch at Seasons Taiwanese Eatery was a spicy, savory success!",
				"We tried a variety of dishes and every single one packed flavor and heat:",
				"• Braised Tofu: Flash fried to crispy perfection, topped with a tangy ginger sauce and served with pickled cabbage—light but satisfying.",
				"• Two Choice Combo: We chose braised beef shank and boiled pork—both tender, juicy, and full of traditional Taiwanese flavor.",
				"• Taiwanese Popcorn Chicken: Crispy, juicy, and perfectly seasoned—this was a favorite.",
				"• Chef’s Special Ma La Noodle: Comes with beef tendon and braised beef in a fiery broth. We ordered everything at level 5 spice and trust us—this isn’t your average “mild” kick. This is true Asian heat.",
			],
		},
	];

	return <InstagramFeed posts={Posts} />;
};

export default InstagramComponent;
