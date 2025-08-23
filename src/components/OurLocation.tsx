// location component

"use client";

import React from "react";

const LocationComponent = () => {
	const locationData = {
		title: "Beretania, Honolulu",
		subtitle: "Seasons Taiwanese Eatery",

		mapQuery: "100 N Beretania St #109, Honolulu, HI 96817",

		contact: {
			phone: "808-744-0272",
			email: "contact@seasonseateryhi.com",
		},

		openingTime: "10:30 AM PDT",

		extraInfo: "* No dinner on Sunday",

		actionLinkDirections: {
			text: "Get Directions",
			url: "https://maps.google.com/?q=Seasons Tiwanese Eatery, 100 N Beretania St #109, Honolulu, HI 96817",
		},

		actionLinkContact: {
			text: "Contact",
			url: "https://maps.google.com/?q=Seasons Tiwanese Eatery, 100 N Beretania St #109, Honolulu, HI 96817",
		},

		openingHours: [
			{ day: "Lunch", hours: "10:30 AM - 2:30 PM" },
			{ day: "Dinner", hours: "4:30 PM - 8:30 PM" },
		],
	};

	// Create the Google Maps embed URL
	const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(locationData.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

	return (
		<div className="mx-[10px] sm:mx-[70px]">
			<h2 className="text-h3 sm:text-h2 mb-[32px]">Our Location</h2>

			<div className="relative">
				{/* Map Container */}
				<div className="w-full h-[400px] rounded-[14px] overflow-hidden">
					<iframe
						width="100%"
						height="100%"
						id="gmap_canvas"
						src={mapUrl}
						aria-label={`Map showing location of ${locationData.subtitle}`}
					></iframe>
				</div>

				{/* Overlay Container */}
				<div className="hidden absolute inset-0 z-20 p-[16px] md:flex flex-wrap justify-between pointer-events-none">
					<div className="flex flex-col gap-2">
						<div className="flex flex-col h-fit w-[264px] px-[24px] py-[21px] items-start gap-[10px] self-stretch rounded-[30px] border-primary-dark/25 border bg-white/40 shadow-black/15 shadow-[6px] backdrop-blur-[14px]">
							<div>
								{locationData.title && (
									<div className="text-normal2 font-medium text-black/50">
										{locationData.title}
									</div>
								)}
								<p className="text-normal2 font-medium text-black">
									{locationData.subtitle}
								</p>
							</div>
							{/* TODO add nav links here */}
							{/* <div className='w-full'>
                    <button className='h-[25px] text-normal3 text-black/50 w-full flex items-center justify-center bg-black/10 rounded-full'>
                        Contact
                    </button>
                </div> */}

							<div className="w-full">
								<button
									className="h-[25px] w-full flex items-center justify-center bg-primary rounded-full text-white z-50 pointer-events-auto"
									onClick={() => {
										console.log(
											"Opening Google Maps for directions...",
										);
										window.open(
											`https://www.google.com/maps?q=${encodeURIComponent(locationData.mapQuery)}`,
											"_blank",
										);
									}}
								>
									Directions
								</button>
							</div>
						</div>
						<div className="flex flex-col h-fit w-[220px] px-[24px] py-[21px] items-start gap-[10px] self-stretch rounded-[30px] border-primary-dark/25 border bg-white/40 shadow-black/15 shadow-[6px] backdrop-blur-[14px]">
							<div>
								<div className="text-normal4 text-black/50">
									Address
								</div>
								<div className="text-normal4 text-black leading-[24px] mb-[10px]">
									{locationData.mapQuery}
								</div>

								<div className="text-normal4 text-black/50">
									Contact
								</div>
								<div className="text-normal4 text-black leading-[24px]">
									{locationData.contact?.phone}
									<br />
									{locationData.contact?.email}
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col h-fit w-[264px] px-[24px] py-[21px] items-end gap-[10px] self-stretch rounded-[30px] border-primary-dark/25 border bg-white/40 shadow-black/15 shadow-[6px] backdrop-blur-[14px]">
						<div className="w-full">
							<p className="text-normal4 font-medium">
								Opens at {locationData.openingTime}
							</p>
						</div>

						{locationData.openingHours &&
							locationData.openingHours.length > 0 && (
								<div className="w-full">
									<h4 className="text-normal4 font-medium text-center text-gray-600 mb-2">
										Timings
									</h4>
									<div className="">
										{locationData.openingHours.map(
											(item, index) => (
												<React.Fragment key={index}>
													<div className="w-full flex items-center justify-between">
														<p className="text-normal4 text-black/60">
															{item.day}
														</p>
														<p className="text-normal4 text-black/60">
															{item.hours}
														</p>
													</div>
												</React.Fragment>
											),
										)}
										<p className="text-normal4 text-black/60 mt-2">
											{locationData.extraInfo}
										</p>
									</div>
								</div>
							)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LocationComponent;
