// src/app/admin/page.tsx
"use client";

import ThemeButton from "@/components/ThemeBtn";
import { BellRing } from "@/lib/PwaHandler";
import { useState } from "react";

const SEND_NOTIFICATION_CLOUD_FUNCTION_URL =
	"https://us-central1-tableturnerr-com.cloudfunctions.net/sendNotification";

export default function AdminPage() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");
		setError("");

		if (!title || !body) {
			setError("Title and Body are required for the notification.");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(SEND_NOTIFICATION_CLOUD_FUNCTION_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, body, url }),
			});

			if (response.ok) {
				const data = await response.json();
				setMessage(
					`Notification sent successfully! Sent to ${data.sentCount} subscribers. Failed: ${data.failedCount}.`,
				);
				setTitle("");
				setBody("");
				setUrl("");
			} else {
				const errorData = await response.json();
				setError(
					`Failed to send notification: ${errorData.message || response.statusText}`,
				);
			}
		} catch (err: any) {
			console.error("Network error sending notification:", err);
			setError(
				`Network error: ${err.message || "Could not connect to the server."}`,
			);
		} finally {
			setLoading(false);
		}
	};

	// Auth redirect intentionally disabled to keep the admin page accessible.

	return (
		<div className="min-h-screen flex items-center justify-evenly p-6 gap-[12px]">
			<div className="w-[400px] hidden sm:flex flex-col gap-3 p-4 rounded-xl shadow-xl border-2 border-primary-dark items-center justify-center ">
				<ThemeButton
					href="/blogs/createblog"
					text="Create Blog Post"
					textClassname="pr-[8px] pl-[14px]"
					textColor="text-primary-dark"
					className="border-primary border-2 bg-white hover:bg-white"
					iconBgColor="bg-black/5"
					iconBgHoverColor="bg-primary-dark/10"
					iconColor="text-primary"
				/>
			</div>
			<div className="w-full p-4 rounded-xl shadow-xl border-2 border-primary-dark">
				<h1 className="text-h5 font-semibold mb-8 text-center">
					Send Push Notification
				</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="mb-6">
						<label
							htmlFor="title"
							className="block text-lg font-medium text-gray-700 mb-2"
						>
							Notification Title{" "}
							<span className="text-red-600">*</span>
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter your notification title"
							className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-base"
							required
						/>
					</div>

					<div className="mb-6">
						<label
							htmlFor="body"
							className="block text-lg font-medium text-gray-700 mb-2"
						>
							Notification Body{" "}
							<span className="text-red-600">*</span>
						</label>
						<textarea
							id="body"
							value={body}
							onChange={(e) => setBody(e.target.value)}
							rows={4}
							placeholder="Enter notification message"
							className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-base"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="url"
							className="block text-lg font-medium text-gray-700 mb-2"
						>
							Optional URL (e.g., /specials)
						</label>
						<input
							type="text"
							id="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-base"
							placeholder="/blog/new-post  or  https://seasonseateryhi.com/blogs"
						/>
					</div>

					<div className="flex justify-end mt-6 w-full">
						<button
							type="submit"
							disabled={loading}
							className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-md shadow-md
                         hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 
                         disabled:cursor-not-allowed self-end"
						>
							{loading ? (
								<div className="flex items-evenly gap-2">
									Sending...
								</div>
							) : (
								<div className="flex items-evenly gap-2">
									<BellRing />
									Send Notification
								</div>
							)}
						</button>
					</div>
				</form>

				{message && (
					<div
						className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded fixed right-10 top-20 z-50 mb-4 shadow-lg"
						role="alert"
					>
						<strong className="font-bold">Success: </strong>
						<span className="block sm:inline">{message}</span>
						<button
							onClick={() => setMessage("")}
							className="px-4 text-green-700"
						>
							<span className="text-2xl">&times;</span>
						</button>
					</div>
				)}

				{error && (
					<div
						className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded fixed right-10 top-20 z-50 mb-4 shadow-lg"
						role="alert"
					>
						<strong className="font-bold">Error: </strong>
						<span className="block sm:inline">{error}</span>
						<button
							onClick={() => setError("")}
							className="px-4 text-red-700"
						>
							<span className="text-2xl">&times;</span>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
