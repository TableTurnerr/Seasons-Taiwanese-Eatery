// src/components/ThemeButton.tsx (or .jsx)
import React from "react";
// import Link from 'next/link'; // Link component wasn't used, can be removed if not needed elsewhere
// import { head } from 'framer-motion/client'; // This import seems unused, remove if unnecessary

interface ThemeButtonProps {
	text?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Make onClick more specific if needed
	href?: string;
	className?: string;
	showArrow?: boolean;
	arrowRotation?: number;
	textColor?: string;
	textClassname?: string;
	iconBgColor?: string;
	iconBgHoverColor?: string;
	iconColor?: string;
	type?: "button" | "submit" | "reset";
	target?: string; // Add target prop for links
	rel?: string; // Add rel prop for links
	textSize?: string;

	ArrowIcon?: React.ReactNode;
	Icon?: React.ReactNode;
	animate?: boolean;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
	text = "Order Now",
	onClick,
	href,
	className = "",
	showArrow = true,
	arrowRotation = -45,
	textColor = "text-white",
	textClassname = "",
	iconBgColor = "bg-white/10",
	iconBgHoverColor = "bg-black/25",
	iconColor = "text-white",
	type = "button",
	target = "_blank",
	rel = "noopener noreferrer",
	textSize = "text-normal2",
	Icon = null,
	ArrowIcon = null,
	animate = false,
}) => {
	// Define the common visual content
	const buttonContent = (
		<div
			className={`group ${className} border border-primary/50 hover:scale-105 shadow-lg hover:shadow-xl rounded-[9px] ${animate ? "" : "min-w-[157px]"} min-h-[41px] w-fit overflow-hidden flex hover:bg-primary bg-[#870c11] transition-all duration-200 items-center`}
		>
			<div
				className={`text-nowrap font-bold ${textColor} ${textClassname} ${textSize} mx-auto h-full flex items-center justify-center`}
			>
				{!animate ? (
					Icon == null ? (
						text
					) : (
						Icon
					)
				) : (
					<div className="flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out group-hover:pr-2">
						{Icon && <span className="shrink-0">{Icon}</span>}
						<span className="max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden">
							{text}
						</span>
					</div>
				)}
			</div>
			{showArrow && (
				<div className="flex justify-end m-[5px]">
					<div
						className={`w-[31px] h-[31px] ${iconBgColor}  group-hover:${iconBgHoverColor}  rounded-[7px] transition-all duration-300 flex items-center justify-center`}
					>
						{ArrowIcon ? (
							ArrowIcon
						) : (
							<svg
								className={`w-6 h-6 ${iconColor}`}
								style={{
									transform: `rotate(${arrowRotation}deg)`,
								}}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
						)}
					</div>
				</div>
			)}
		</div>
	);

	// If href is provided, render as an anchor tag (link)
	if (href) {
		// Check if it's an external link
		const isExternal =
			href.startsWith("http://") ||
			href.startsWith("https://") ||
			href.startsWith("//");
		const linkTarget = isExternal ? target : undefined; // Only use target for external links usually
		const linkRel = isExternal ? rel : undefined; // Only use rel for external links

		return (
			<a href={href} target={linkTarget} rel={linkRel}>
				{buttonContent}
			</a>
		);
		// If using Next.js Link for internal routing:
		// if (!isExternal) {
		//  return <Link href={href}>{buttonContent}</Link>
		// } else { // External link }
	}

	// If onClick is provided (and href is not), render as a button tag
	if (onClick) {
		return (
			<button type={type} onClick={onClick}>
				{buttonContent}
			</button>
		);
	}

	// Fallback: If neither href nor onClick is provided, render a non-interactive div
	// Or you could render a disabled button: <button type={type} disabled>{buttonContent}</button>
	return <div>{buttonContent}</div>;
};

export default ThemeButton;
