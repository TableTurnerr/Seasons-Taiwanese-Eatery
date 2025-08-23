import React from 'react';
import Image from 'next/image';

interface PromotionalBannerProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

import placeholderImg from "@/../public/Images/Product img 2.png";
import ThemeButton from './ThemeBtn';


const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  image,
  title,
  description,
  buttonText,
  buttonUrl
}) => {
  return (
    <div className="relative w-full h-full sm:h-[500px] md:h-[664px] p-[42px] rounded-lg overflow-hidden"
        style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
            alignSelf: 'stretch',
        }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src={placeholderImg}
          alt="Season's Taiwanese Eatery Best Restaurant in Honolulu, Hawaii"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content Overlay */}
      <div className="max-w-[584px] h-full flex flex-col items-start justify-center px-[30px] md:py-[114px] md:px-[50px] gap-2.5 flex-1 rounded-[28px] bg-black/25 backdrop-blur-[13px]">
				<div
					style={{
						display: "flex",
						flexDirection: 'column',
						alignItems: 'flex-start',
						gap: '28px',
					}}
				>

					<h2 className="text-h4 md:text-h2 font-medium text-white w-[70%]">{title}</h2>
					
					<p className="text-white/65 text-normal2 md:text-normal1">
						{description}
					</p>
					
					<ThemeButton/>

          <div className='h-3 block sm:hidden'/>


				</div>
      </div>
    </div>
  );
};

export default PromotionalBanner;