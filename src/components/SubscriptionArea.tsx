// src/components/SubscriptionArea.tsx
import React, { useState, useEffect, useCallback } from "react";
import { db } from "../firebaseConfig"; // Adjust path
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import bg from "@/../public/Images/popupbg.webp";

import RiveEmbed from "./RiveEmbed";

const SubscriptionArea = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	const handleSubmit = async (e?: React.FormEvent): Promise<void> => {
		if (e) e.preventDefault();

		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			console.log(process.env.NEXT_PUBLIC_FIREBASE_RESTAURANT_ID);
			const subscribersCollectionRef = collection(
				db,
				`Restaurants/${process.env.NEXT_PUBLIC_FIREBASE_RESTAURANT_ID}/Subscribers`,
			);
			await addDoc(subscribersCollectionRef, {
				email: email,
				subscribedAt: serverTimestamp(),
				// noMarketing: noMarketing,
				date: new Date().toISOString(),
			});

			console.log("Submission successful");
			setIsSubmitted(true);
			localStorage.setItem("newsletterSubscribed", "true");
		} catch (err) {
			console.error("Error adding document: ", err);
			setError("Subscription failed. Please try again.");
			setIsLoading(false);
		}
	};

	// Show success message if submitted, otherwise show form
	const showSuccessMessage = isSubmitted;

	return (
		<div
			className="relative overflow-hidden w-full z-60 bg-white rounded-lg shadow-xl px-6 pt-6 sm:px-8 sm:pt-8 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<div
				className="-z-10 absolute top-0 left-0 h-full w-1/2"
				style={{ backgroundImage: `url(${bg.src})` }}
			></div>
			<div
				className="-z-10 absolute top-0 right-0 rotate-y-180 h-full w-1/2"
				style={{ backgroundImage: `url(${bg.src})` }}
			></div>

			<div className="z-100">
				{showSuccessMessage ? (
					// Success State
					<div className="text-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-16 h-16 mx-auto text-primary mb-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h2 className="text-xl font-semibold mb-2">
							Thank You!
						</h2>
						<p className="text-gray-600 pb-4">
							{"You're subscribed!"}
						</p>
					</div>
				) : (
					// Form State - Use config for text
					<>
						<h2 className="text-primary-dark text-h5 font-semibold mb-3 text-center font-not-east">
							{"Stay Updated!"}
						</h2>
						<p className="text-grey mb-6 text-center text-normal4 sm:text-normal3">
							{"Get exclusive discounts by joining our family."}
						</p>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="newsletter-email"
									className="sr-only"
								>
									Email address
								</label>
								<input
									type="email"
									id="newsletter-email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="your.email@example.com"
									required
									className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-shadow"
									disabled={isLoading}
								/>
							</div>
							{/* <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="no-marketing"
                                            type="checkbox"
                                            checked={noMarketing}
                                            onChange={(e) => setNoMarketing(e.target.checked)}
                                            className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-primary-dark"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm ">
                                        <label htmlFor="no-marketing" className="text-gray-600">
                                            Use this email for updates, not promotions!
                                        </label>
                                    </div>
                                </div> */}
							{error && (
								<p className="text-red-500 text-sm">{error}</p>
							)}
							<div className="flex justify-center mb-0">
								<RiveEmbed
									onBtnPress={handleSubmit}
									isDisabled={isLoading}
								/>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default SubscriptionArea;
