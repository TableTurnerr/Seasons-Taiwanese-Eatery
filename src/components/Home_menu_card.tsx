import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Image from 'next/image';

import placeholderImg from "@/../public/Images/menu.png";
import { MenuItem } from './Home_menu_section';

export interface ScrollableMenuRef {
  scrollNext: () => void;
}

interface ScrollableMenuCardsProps {
  menuItems: MenuItem[];
  onScrollEndChange?: (isAtEnd: boolean) => void;
}

const ScrollableMenuCards = forwardRef<ScrollableMenuRef, ScrollableMenuCardsProps>(
  ({ menuItems, onScrollEndChange }, ref) => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAtEnd, setIsAtEnd] = useState(false);
    // Store the timeout ID to clear it if component unmounts during scroll debounce
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // --- Function to scroll to the next card or loop back ---
    const scrollNext = useCallback(() => {
      const container = scrollContainerRef.current;
      if (!container || menuItems.length === 0) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;

      const firstCard = container.children[0] as HTMLElement | undefined;
      const cardWidth = firstCard?.offsetWidth ?? clientWidth; 
      const gap = 16; 
      const scrollAmount = cardWidth + gap; 
      const threshold = 10;
      const isNearEnd = scrollLeft + clientWidth >= scrollWidth - threshold;

      if (isNearEnd) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, [menuItems.length]); 

    useImperativeHandle(ref, () => ({
      scrollNext,
    }));

    const checkScrollPosition = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        const threshold = 10;
        const currentIsAtEnd = scrollLeft + clientWidth >= scrollWidth - threshold;

        setIsAtEnd(prevIsAtEnd => {
            if (prevIsAtEnd !== currentIsAtEnd) {
                if (onScrollEndChange) {
                    onScrollEndChange(currentIsAtEnd);
                }
                return currentIsAtEnd;
            }
            return prevIsAtEnd;
        });

    }, [onScrollEndChange]); 


     const handleScroll = useCallback(() => {
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            checkScrollPosition();
        }, 150);
     }, [checkScrollPosition]);


    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      checkScrollPosition();

      container.addEventListener('scroll', handleScroll);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [menuItems, handleScroll, checkScrollPosition]); // Rerun if items or handlers change



  return (
    <div className="w-full bg-primary-dark text-white px-2 sm:px-6 pt-3 pb-0">
      {/* Header Section
      <div className="mb-6">
        <h2 className="text-heading-4 font-bold">{title}</h2>
        {subtitle && <p className="text-normal-2 mt-1 opacity-80">{subtitle}</p>}
        <div className="flex items-center mt-4">
          <p className="text-normal-3">Scroll through to explore our dishes.</p>
          <svg className="ml-2 w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div> */}

      {/* Scrollable Cards Section */}
      <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 scrollbar-hide">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="w-[300px] sm:w-[386px] text-black rounded-[12px] overflow-hidden flex-shrink-0"
          >
            {/* Card Image */}
            <div className="relative h-[240px] w-full">
              <Image 
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="mt-[-12px] z-10 relative bg-white rounded-[12px] pb-[12px] px-[16px]">
              <div className="text-h5 font-bold py-3">{item.name}</div>
              
              {/* Price and Points */}
              <div className="flex mt-1 items-center pb-3">
                <span className="text-normal4 text-primary-dark font-bold">$ {item.price}</span>
                {/* <div className='h-1 w-1 bg-black/40 rounded-full m-[6.5px]'></div> */}
                
                {/* { item.priceL && item.priceL > 0 && item.priceM !== item.priceL &&
                  <>
                    <span className="text-normal4 text-primary-dark font-bold">$ {item.priceL.toFixed(2)}</span>
                    <div className='h-1 w-1 bg-black/40 rounded-full m-[6.5px]'/>
                  </>
                } */}
                {/* <span className="text-normal4 text-primary items-center">+ {item.loyaltyPoints} points</span> */}
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag, idx) => {
                 
                  return (
                    <span 
                      key={idx} 
                      className={`text-normal4 px-[12px] py-[3px] rounded-full bg-black/[0.03] text-black/50`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>
        {`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;             /* Chrome, Safari and Opera */
        }
      `}
      </style>

    </div>
  );
}
);

export default ScrollableMenuCards;