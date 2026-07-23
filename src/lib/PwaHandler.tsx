// src/app/PwaHandler.tsx
"use client"; // This component must be a client component

import ThemeButton from "@/components/ThemeBtn";
import { error } from "console";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Utility function to convert VAPID public key from base64 to Uint8Array
// This is required by the Push API
function urlB64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

export const BellRing = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#ffffff"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-bell-ring-icon lucide-bell-ring"
		>
			<path d="M10.268 21a2 2 0 0 0 3.464 0" />
			<path d="M22 8c0-2.3-.8-4.3-2-6" />
			<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
			<path d="M4 2C2.8 3.7 2 5.7 2 8" />
		</svg>
	);
};

export const BellOff = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#ffffff"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-bell-off-icon lucide-bell-off"
		>
			<path d="M10.268 21a2 2 0 0 0 3.464 0" />
			<path d="M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742" />
			<path d="m2 2 20 20" />
			<path d="M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05" />
		</svg>
	);
};

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

export default function PwaHandler() {
	const [notificationPermission, setNotificationPermission] = useState<
		NotificationPermission | "prompt"
	>("default");
	const [isSubscribed, setIsSubscribed] = useState(false);

	useEffect(() => {
		// Check for Service Worker and Push API support
		if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
			console.warn(
				"Service Worker or Push API not supported in this browser.",
			);
			return;
		}

		// Register the Service Worker
		navigator.serviceWorker
			.register("/sw.js")
			.then((registration) => {
				console.log(
					"Service Worker registered with scope:",
					registration.scope,
				);
				// After registration, check and update push subscription status
				checkSubscriptionStatus(registration);
			})
			.catch((error) => {
				console.error("Service Worker registration failed:", error);
			});

		// Function to check current subscription status
		const checkSubscriptionStatus = async (
			registration: ServiceWorkerRegistration,
		) => {
			try {
				const subscription =
					await registration.pushManager.getSubscription();
				if (subscription) {
					setIsSubscribed(true);
					console.log("User is already subscribed:", subscription);
				} else {
					setIsSubscribed(false);
					console.log("User is not subscribed.");
				}
			} catch (error) {
				console.error("Error getting push subscription:", error);
			}
		};

		// Listen for changes in notification permission
		const handlePermissionChange = () => {
			setNotificationPermission(Notification.permission);
			console.log(
				"Notification permission changed:",
				Notification.permission,
			);
			if (Notification.permission === "granted") {
				navigator.serviceWorker.ready.then(checkSubscriptionStatus);
			}
		};

		if ("permissions" in navigator) {
			navigator.permissions
				.query({ name: "notifications" })
				.then((permissionStatus) => {
					setNotificationPermission(permissionStatus.state);
					permissionStatus.onchange = handlePermissionChange;
				});
		} else {
			setNotificationPermission(Notification.permission);
		}

		return () => {
			if ("permissions" in navigator) {
				navigator.permissions
					.query({ name: "notifications" })
					.then((permissionStatus) => {
						permissionStatus.onchange = null;
					});
			}
		};
	}, []);

	// Function to subscribe the user to push notifications
	const subscribeUser = async () => {
		if (
			notificationPermission === "default" ||
			notificationPermission === "prompt"
		) {
			try {
				const permission = await Notification.requestPermission();
				if (permission === "granted") {
					console.log("Notification permission granted.");
					setNotificationPermission("granted");
				} else {
					console.warn("Notification permission denied.");
					setNotificationPermission("denied");
					return; // Exit if permission is not granted
				}
			} catch (error) {
				console.error(
					"Error requesting notification permission:",
					error,
				);
				return;
			}
		}

		if (notificationPermission === "granted") {
			try {
				if (!VAPID_PUBLIC_KEY) {
					throw console.error("VAPID_PUBLIC_KEY not found");
				}

				const registration = await navigator.serviceWorker.ready;
				const subscription = await registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY),
				});

				console.log("User subscribed:", subscription);
				setIsSubscribed(true);
				// Send the subscription object to your backend server
				await sendSubscriptionToServer(subscription);
			} catch (error) {
				console.error("Failed to subscribe the user:", error);
				// Handle cases where subscription fails (e.g., user blocked notifications)
				if (Notification.permission === "denied") {
					console.warn("Notifications are blocked by the user.");
				}
			}
		} else {
			console.log(
				"Cannot subscribe: Notification permission is not granted.",
			);
		}
	};

	// Function to unsubscribe the user from push notifications
	const unsubscribeUser = async () => {
		try {
			const registration = await navigator.serviceWorker.ready;
			const subscription =
				await registration.pushManager.getSubscription();

			if (subscription) {
				await subscription.unsubscribe();
				setIsSubscribed(false);
				console.log("User unsubscribed:", subscription);
				// Optionally, inform your server to remove this subscription
				// await removeSubscriptionFromServer(subscription);
			} else {
				console.log("User is not currently subscribed.");
			}
		} catch (error) {
			console.error("Error unsubscribing:", error);
		}
	};

	// Function to send the subscription to your server
	const sendSubscriptionToServer = async (subscription: PushSubscription) => {
		try {
			const response = await fetch(
				"https://us-central1-tableturnerr-com.cloudfunctions.net/subscribe",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(subscription),
				},
			);
			if (response.ok) {
				console.log("Subscription sent to server successfully.");
			} else {
				console.error(
					"Failed to send subscription to server:",
					response.statusText,
				);
			}
		} catch (error) {
			console.error(
				"Network error sending subscription to server:",
				error,
			);
		}
	};

	const pathname = usePathname();

	if (pathname !== "/") {
		return null;
	}

	return (
		<div className="flex flex-col items-center justify-center p-4 gap-[20px]">
			<h2 className="text-[28px] font-semibold mb-2 text-primary-dark">
				{isSubscribed ? "Disable " : "Enable "} Push Notifications
			</h2>
			{/* <p className="mb-1">
				Service Worker:{" "}
				{"serviceWorker" in navigator ? "Supported" : "Not Supported"}
			</p> */}
			{/* <p className="mb-1">
				Notification Permission:{" "}
				<span
					className={`font-bold ${
						notificationPermission === "granted"
							? "text-green-600"
							: notificationPermission === "denied"
								? "text-red-600"
								: "text-yellow-600"
					}`}
				>
					{notificationPermission.charAt(0).toUpperCase() +
						notificationPermission.slice(1)}
				</span>
			</p> */}

			{/* <p className="mb-4">
				Push Subscription:{" "}
				<span
					className={`font-bold ${isSubscribed ? "text-green-600" : "text-red-600"}`}
				>
					{isSubscribed ? "Subscribed" : "Not Subscribed"}
				</span>
			</p> */}

			<ThemeButton
				onClick={!isSubscribed ? subscribeUser : unsubscribeUser}
				textClassname="pr-[8px] pl-[14px]"
				arrowRotation={0}
				ArrowIcon={!isSubscribed ? <BellRing /> : <BellOff />}
				className="rounded"
				iconBgColor="bg-white/10 rounded"
				text={
					!isSubscribed
						? "Enable Push Notifications"
						: "Disable Push Notifications"
				}
			/>

			{notificationPermission === "denied" && (
				<p className="mt-2 text-sm text-primary">
					Notifications are blocked. Please enable them in your
					browser settings to receive updates.
					<p className="mt-1 text-nowrap">
						Settings -&gt; Privacy and security -&gt; Site settings
					</p>
				</p>
			)}
		</div>
	);
}
