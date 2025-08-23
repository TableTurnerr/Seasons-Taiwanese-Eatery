"use client";

import React, { useState } from "react";
import { AnimatedCTAButton } from "./CTA_header_btn";
import logo from "@/../public/Images/logo.webp";
import Image from "next/image";
import { AnimatedMenuButton } from "./Menu_Header_btn";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "@/constants/IsMobile";

function Header({ onRedirectClick }: { onRedirectClick: () => void }) {
	const router = useRouter();
	const pathname = usePathname();
	const { isMobile } = useIsMobile();

	const scrollToSection = (sectionId: string) => {
		if (pathname === "/") {
			const section = document.getElementById(sectionId);
			if (section) {
				section.scrollIntoView({ behavior: "smooth", block: "start" });
			} else {
				console.warn(
					`Scroll target not found on home page: #${sectionId}`,
				);
			}
		} else {
			router.push(`/#${sectionId}`);
		}
	};

	return (
		<div className="p-[20px] w-full">
			<div className={`w-full grid grid-cols-3 items-center`}>
				{/* Left Section */}
				<div className="flex justify-start">
					<AnimatedMenuButton
						menuItems={[
							{
								name: "Blogs",
								onclick: () => {
									router.push("/blogs");
								},
							},
							{
								name: "Home",
								onclick: () => {
									scrollToSection("Home");
								},
							},
							{
								name: "Menu",
								onclick: () => {
									scrollToSection("Menu");
								},
							},
							{
								name: "Reviews",
								onclick: () => {
									scrollToSection("Reviews");
								},
							},
							{
								name: "Our Story",
								onclick: () => {
									scrollToSection("Story");
								},
							},
							{
								name: "Featuring",
								onclick: () => {
									scrollToSection("Featuring");
								},
							},
							{
								name: "FAQ's",
								onclick: () => {
									scrollToSection("FAQ's");
								},
							},
							{
								name: "Location",
								onclick: () => {
									scrollToSection("Location");
								},
							},
						]}
					/>
				</div>

				{/* Center Section (Always Centered) */}
				<div className={`flex justify-center`}>
					<div
						className=" text-white"
						onClick={() => router.push("/")}
					>
						<Image
							src={logo}
							alt="Seasons Taiwanese Eatery Logo"
							width={isMobile ? 50 : 70}
							height={isMobile ? 50 : 70}
							className="object-cover"
							priority
						/>
					</div>
				</div>

				{/* Right Section */}
				<div className="flex justify-end w-full min-w-[100px]">
					<AnimatedCTAButton
						onRedirectClick={onRedirectClick}
						onBlogClick={() => {
							window.open(
								`https://www.google.com/maps?q=${encodeURIComponent("100 N Beretania St #109, Honolulu, HI 96817")}`,
								"_blank",
							);
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default Header;
