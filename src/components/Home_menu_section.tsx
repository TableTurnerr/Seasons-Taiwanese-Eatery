"use client";

import { div } from 'framer-motion/client';
import React, { useCallback, useRef, useState } from 'react'

import Image from 'next/image';

import arrow from '@/../public/Svgs/Arrow.svg';
import ScrollableMenuCards, { ScrollableMenuRef } from './Home_menu_card';

import placeholderImg from "@/../public/Images/Product img 1.png";

export interface MenuItem {
  id: string;
  name: string;
  image: string;
  price: number;
  loyaltyPoints: number;
  description: string;
  tags: string[];
  isFavorite?: boolean;
}

export default function Home_menu_section() {
	
  const popularItems : MenuItem[] = [
    {
      id: '1',
      name: 'Popcorn Chicken',
      image: 'https://pixel.menusifu.com/674a336c694d346a53507453652b6d614b742b7345673d3d/o_popcornchicken.png',
      price: 17.95,
      loyaltyPoints: 45,
      description: 'Crispy bite-sized chicken pieces with a golden crust.',
      tags: ['chicken', 'spice level 1 to 5'],
      isFavorite: false,
    },
    {
      id: '2',
      name: "Classic Beef Broth",
      image: 'https://pixel.menusifu.com/674a336c694d346a53507453652b6d614b742b7345673d3d/20250212083318678yZYi.jpg',
      price: 19.95,
      loyaltyPoints: 25,
      description: 'A fiery broth infused with special spices, perfect for spice lovers.',
      tags: ['Beef', 'Tendon', 'Meat', 'Egg'],
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Retro Spicey Broth',
      image: 'https://pixel.menusifu.com/674a336c694d346a53507453652b6d614b742b7345673d3d/20250212083353599kRsp.jpg',
      price: 18.95,
      loyaltyPoints: 55,
      description: 'Deliciously crispy on the outside, soft on the inside tofu.',
      tags: ['Beef', 'Tendon', 'spice level 1 to 5'],
      isFavorite: true,
    },
    {
      id: '4',
      name: 'Dragon Dumplings',
      image: 	'https://pixel.menusifu.com/674a336c694d346a53507453652b6d614b742b7345673d3d/2025021208361369ktXb.jpg',
      price: 17.95,
      loyaltyPoints: 35,
      description: 'Hearty beef slices in a savory noodle soup.',
      tags: ['Sichuan Pepper Oil' ],
      isFavorite: false,
    },
  ];


  const scrollableMenuRef = useRef<ScrollableMenuRef>(null);
  const [isMenuAtEnd, setIsMenuAtEnd] = useState(false);

  const handleScrollEndChange = useCallback((isAtEnd: boolean) => {
    console.log("Parent received isAtEnd:", isAtEnd);
    setIsMenuAtEnd(isAtEnd);
  }, []); // Empty dependency array means this function identity is stable

  // Function to trigger scroll in the child component
  const handleNextClick = () => {
      if (scrollableMenuRef.current) {
          scrollableMenuRef.current.scrollNext();
      }
  };

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className='relative w-full h-full overflow-hidden sm:h-[440px] rounded-l-[12px] bg-primary-dark flex flex-col sm:flex-row p-[20px] group'>
      <div
          className={`hidden sm:block absolute -bottom-60 -left-60 group-hover:-bottom-18 group-hover:-left-12 w-80 h-80 bg-black/10 rounded-full pointer-events-none transition-all duration-500 ease-in-out -z-0`}
      />
			<div className='h-full flex px-[8px] py-[26px] flex-col z-10'>
				<div className='text-h3 text-white text-start leading-[1.2]'>
					Trending
					<br />
					Taiwanese
					<br />
					cusine
				</div>
				<div className='text-white/50 text-normal1 mt-[5px]'>
					Treat yourself to our must-try list that has everyone talking.
				</div>

				<div className='flex-1'/>
				
				<div className='text-normal3 text-white'>
					Scroll through to explore our dishes.
				</div>
				<div className='hover:bg-white/20 group-hover:translate-x-5 transition-all duration-300 rounded-full w-fit aspect-square flex items-center justify-center' 
          onClick={handleNextClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            rotate: isMenuAtEnd ? '180deg' : '0deg',
          }}
        >
					<Image
						src={arrow}
						alt="Arrow"
						className="w-[24px] h-[24px] m-[10px] cursor-pointer"
					/>
				</div>
			</div>

			<div className='overflow-x-hidden'>
				<ScrollableMenuCards
            ref={scrollableMenuRef} 
            menuItems={popularItems} 
            onScrollEndChange={handleScrollEndChange} 
				/>
			</div>
    </div>
)
}
