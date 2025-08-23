// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TabTitleHandler from "@/components/TabTitleHandler";
import Script from "next/script";
import ClientLayout from "@/components/ClientLayout"; // Import the new client wrapper
import { AuthProvider } from "@/context/AuthContext";
import PwaHandler from "@/lib/PwaHandler";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// --- METADATA STAYS HERE ---
export const metadata: Metadata = {
	title: "Seasons Taiwanese Eatery",
	description:
		"Savor the Best Taiwanese Food in Honolulu. A Taiwanese eatery that offers a unique dining experience with a focus on authentic flavors and seasonal ingredients.",
	keywords:
		"Taiwanese food, Honolulu, authentic flavors, seasonal ingredients, dining experience",
	robots: {
		index: true,
		follow: true,
	},
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Seasons Eatery",
	},
};
// --- END METADATA ---

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

	return (
		<html lang="en">
			<head></head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TabTitleHandler />

				<ClientLayout>
					<AuthProvider>{children}</AuthProvider>
				</ClientLayout>

				{gaMeasurementId && (
					<>
						<Script
							strategy="afterInteractive"
							src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
						/>
						<Script
							id="google-analytics"
							strategy="afterInteractive"
							dangerouslySetInnerHTML={{
								__html: `
                   window.dataLayer = window.dataLayer || [];
                   function gtag(){dataLayer.push(arguments);}
                   gtag('js', new Date());
                   gtag('config', '${gaMeasurementId}');
                 `,
							}}
						/>
					</>
				)}
			</body>
		</html>
	);
}
