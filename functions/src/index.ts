// functions/src/index.ts
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import webpush from "web-push";

admin.initializeApp();
const db = admin.firestore();

// --- VAPID Keys Configuration ---
const vapidEmail = "mailto:spam.alee.abd@gmail.com";

// Define the Firestore collection where subscriptions will be stored
const subscriptionsCollection = db.collection(
	"/Restaurants/rQWEiFuALOEGV7V1lHEX/pushSubscriptions",
);

// --- HTTP Cloud Function to Handle Push Subscriptions ---
// This function will be called from your PWA's client-side (PwaHandler.tsx)
export const subscribe = functions.https.onRequest(
	{ secrets: ["VAPID_PUBLIC_KEY", "VAPID_PRIVATE_KEY"] },
	async (req, res) => {
		const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
		const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

		if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
			console.error(
				"VAPID keys are not configured as runtime environment variables. Please set them using the Firebase CLI.",
			);
			throw new Error(
				"VAPID keys not configured. Deployment will fail or function will not work correctly.",
			);
		}

		webpush.setVapidDetails(
			vapidEmail,
			VAPID_PUBLIC_KEY,
			VAPID_PRIVATE_KEY,
		);

		// Allow CORS requests. In production, restrict to your domain.
		res.set("Access-Control-Allow-Origin", "*");
		res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
		res.set("Access-Control-Allow-Headers", "Content-Type");

		// Handle preflight OPTIONS request
		if (req.method === "OPTIONS") {
			res.status(204).send("");
			return;
		}

		if (req.method !== "POST") {
			res.status(405).send("Method Not Allowed");
			return;
		}

		try {
			const subscription: webpush.PushSubscription = req.body;

			if (!subscription || !subscription.endpoint) {
				res.status(400).send("Invalid subscription data.");
				return;
			}

			// Check if the subscription already exists to avoid duplicates
			const querySnapshot = await subscriptionsCollection
				.where("endpoint", "==", subscription.endpoint)
				.get();

			if (querySnapshot.empty) {
				// If no existing subscription, add the new one to Firestore
				await subscriptionsCollection.add(subscription);
				console.log(
					"New subscription added to Firestore:",
					subscription.endpoint,
				);
			} else {
				console.log(
					"Subscription already exists in Firestore:",
					subscription.endpoint,
				);
			}

			res.status(201).json({ message: "Subscription successful" });
		} catch (error) {
			console.error("Failed to handle subscription request:", error);
			res.status(500).send("Subscription failed");
		}
	},
);

// --- Helper function to get all current subscriptions from Firestore ---
const getSubscriptionsFromFirestore = async (): Promise<
	webpush.PushSubscription[]
> => {
	try {
		const querySnapshot = await subscriptionsCollection.get();
		const subscriptions: webpush.PushSubscription[] = [];
		querySnapshot.forEach((doc) => {
			subscriptions.push(doc.data() as webpush.PushSubscription);
		});
		return subscriptions;
	} catch (error) {
		console.error("Error fetching subscriptions from Firestore:", error);
		return []; // Return empty array on error
	}
};

// --- Helper function to remove an invalid subscription from Firestore ---
const removeSubscriptionFromFirestore = async (
	endpoint: string,
): Promise<void> => {
	try {
		const querySnapshot = await subscriptionsCollection
			.where("endpoint", "==", endpoint)
			.get();

		if (!querySnapshot.empty) {
			// Delete the first matching document (assuming endpoint is unique per user)
			const docToDelete = querySnapshot.docs[0];
			await docToDelete.ref.delete();
			console.log(
				`Subscription removed from Firestore for endpoint: ${endpoint}`,
			);
		} else {
			console.log(
				`No subscription found to remove for endpoint: ${endpoint}`,
			);
		}
	} catch (error) {
		console.error(
			`Failed to remove subscription from Firestore for endpoint ${endpoint}:`,
			error,
		);
	}
};

// --- HTTP Cloud Function to Send Push Notifications ---
// This function could be triggered manually (e.g., via a CURL request, or an admin panel)
// or programmatically (e.g., from another Cloud Function after a blog post update).
export const sendNotification = functions.https.onRequest(
	{ secrets: ["VAPID_PUBLIC_KEY", "VAPID_PRIVATE_KEY"] },
	async (req, res) => {
		const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
		const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

		if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
			console.error(
				"VAPID keys are not configured as runtime environment variables. Please set them using the Firebase CLI.",
			);
			throw new Error(
				"VAPID keys not configured. Deployment will fail or function will not work correctly.",
			);
		}

		webpush.setVapidDetails(
			vapidEmail,
			VAPID_PUBLIC_KEY,
			VAPID_PRIVATE_KEY,
		);

		// Allow CORS requests for testing purposes. Restrict in production.
		res.set("Access-Control-Allow-Origin", "*");
		res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
		res.set("Access-Control-Allow-Headers", "Content-Type");

		// Handle preflight OPTIONS request
		if (req.method === "OPTIONS") {
			res.status(204).send("");
			return;
		}

		if (req.method !== "POST") {
			res.status(405).send("Method Not Allowed");
			return;
		}

		try {
			const { title, body, url = "/" } = req.body;

			if (!title || !body) {
				res.status(400).json({
					message: "Missing title or body for notification",
				});
				return;
			}

			const payload = JSON.stringify({
				title: title,
				body: body,
				url: url,
				icon: "/web-app-manifest-192x192.png",
			});

			const currentSubscriptions = await getSubscriptionsFromFirestore();

			if (currentSubscriptions.length === 0) {
				console.log("No subscriptions found to send notifications to.");
				res.status(200).json({ message: "No subscribers found" });
				return;
			}

			const pushPromises = currentSubscriptions.map((subscription) =>
				webpush
					.sendNotification(subscription, payload)
					.catch(async (error) => {
						console.error(
							`Failed to send notification to ${subscription.endpoint}:`,
							error,
						);
						// If the subscription is no longer valid, remove it from your storage
						if (
							error.statusCode === 410 ||
							error.statusCode === 404
						) {
							// 410 Gone, 404 Not Found (subscription invalid)
							console.log(
								`Subscription ${subscription.endpoint} is no longer valid. Removing.`,
							);
							await removeSubscriptionFromFirestore(
								subscription.endpoint,
							);
						}
						return null; // Indicate failure for this specific promise
					}),
			);

			// Wait for all push notification attempts to complete
			const results = await Promise.all(pushPromises);

			const sentCount = results.filter(
				(result) => result !== null,
			).length;
			const failedCount = results.length - sentCount;

			console.log(
				`Attempted to send ${results.length} notifications. Sent: ${sentCount}, Failed: ${failedCount}.`,
			);

			res.status(200).json({
				message: "Push notifications processed",
				sentCount: sentCount,
				failedCount: failedCount,
			});
		} catch (error) {
			console.error("Error sending push notifications:", error);
			res.status(500).send("Error sending notifications");
		}
	},
);
