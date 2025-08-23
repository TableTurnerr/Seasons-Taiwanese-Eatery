// app/login/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	User,
	onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
// --- IMPORTANT ---
// Replace this with your actual restaurant ID or a dynamic way to get it.
const RESTAURANT_ID = process.env.NEXT_PUBLIC_FIREBASE_RESTAURANT_ID;
// --- IMPORTANT ---

const LoginPage = () => {
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true); // Overall loading state for auth check
	const [isProcessingLogin, setIsProcessingLogin] = useState(false); // Loading state for login process
	const [error, setError] = useState<string | null>(null);

	// Check initial auth state and redirect if already logged in and authorized
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const userDocRef = doc(
					db,
					`Restaurants/${RESTAURANT_ID}/admins/${user.uid}`,
				);
				try {
					const userDoc = await getDoc(userDocRef);
					if (userDoc.exists()) {
						setCurrentUser(user);
						console.log(
							"User is authorized for this restaurant:",
							userDoc.data(),
						);
						router.push("/admin");
					} else {
						await signOut(auth);
						setCurrentUser(null);
					}
				} catch (dbError) {
					console.error("Error checking user in Firestore:", dbError);
					// Handle DB error, maybe sign out user
					await signOut(auth);
					setCurrentUser(null);
				}
			} else {
				setCurrentUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [router]);

	const handleGoogleSignIn = async () => {
		if (RESTAURANT_ID === "YOUR_RESTAURANT_ID_PLACEHOLDER") {
			setError(
				"Restaurant ID is not configured. Please contact support.",
			);
			return;
		}

		setIsProcessingLogin(true);
		setError(null);
		const provider = new GoogleAuthProvider();

		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			if (user) {
				// Check if user exists in the specific restaurant's user list
				const userDocRef = doc(
					db,
					`Restaurants/${RESTAURANT_ID}/admins/${user.uid}`,
				);
				const userDoc = await getDoc(userDocRef);

				if (userDoc.exists()) {
					setCurrentUser(user);
				} else {
					setError(
						`Access Denied: Your account is not authorized for this restaurant.`,
					);
					await signOut(auth);
					setCurrentUser(null);
				}
			}
		} catch (authError: any) {
			console.error("Error during Google Sign-In:", authError);
			if (authError.code === "auth/popup-closed-by-user") {
				setError("Sign-in process was cancelled.");
			} else {
				setError(`Login failed. ${authError.message}`);
			}
			setCurrentUser(null);
		} finally {
			setIsProcessingLogin(false);
		}
	};

	const handleSignOut = async () => {
		setIsProcessingLogin(true);
		setError(null);
		try {
			await signOut(auth);
			setCurrentUser(null);
		} catch (error: any) {
			console.error("Error signing out:", error);
			setError(`Sign out failed. ${error.message}`);
		} finally {
			setIsProcessingLogin(false);
		}
	};

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen text-[var(--color-color-text-primary)] p-4 font-creto">
				<p className="text-xl">Checking authentication status...</p>
				{/* You can add a spinner here */}
			</div>
		);
	}

	// If already logged in and authorized (handled by useEffect redirect), this part might not be shown often.
	// But it's good for cases where redirect hasn't happened yet or if user navigates back.
	if (currentUser) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen text-[var(--color-color-text-primary)] p-4 font-creto">
				<div className="bg-black/[0.03] p-8 rounded-lg shadow-2xl text-center max-w-md w-full">
					<h1 className="text-3xl font-awakening text-[var(--color-primary)] mb-4">
						Welcome Back!
					</h1>
					<p className="mb-2 text-lg">You are signed in as:</p>
					<p className="mb-6 text-[var(--color-grey)] break-all">
						{currentUser.displayName || currentUser.email}
					</p>
					<p className="mb-6 text-sm text-green-400">
						You are authorized for this restaurant.
					</p>
					<button
						onClick={() => router.push("/blogs")}
						className="w-full mb-4 px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-lg rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
					>
						Go to Create Blog
					</button>
					<button
						onClick={handleSignOut}
						disabled={isProcessingLogin}
						className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md shadow-md transition-colors duration-300 disabled:opacity-50"
					>
						{isProcessingLogin ? "Signing Out..." : "Sign Out"}
					</button>
				</div>
			</div>
		);
	}

	// Login form for unauthenticated users
	return (
		<div className="flex flex-col items-center justify-center min-h-screen shadow-2xl bg-black/[0.03] p-4 font-creto">
			<div className="bg-black/5 p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-md w-full">
				<h1 className="text-4xl md:text-5xl font-awakening text-[var(--color-primary)] mb-6">
					Restaurant Portal
				</h1>
				<p className="text-[var(--color-grey)] mb-8 text-lg">
					Please sign in to continue.
				</p>

				{error && (
					<div className="mb-6 p-3 bg-red-500/20 border border-red-700 text-red-300 rounded-md text-sm">
						{error}
					</div>
				)}
				{RESTAURANT_ID === "YOUR_RESTAURANT_ID_PLACEHOLDER" && (
					<div className="mb-6 p-3 bg-yellow-500/20 border border-yellow-700 text-yellow-300 rounded-md text-sm">
						Site configuration incomplete. Login disabled.
					</div>
				)}

				<button
					onClick={handleGoogleSignIn}
					disabled={
						isProcessingLogin ||
						RESTAURANT_ID === "YOUR_RESTAURANT_ID_PLACEHOLDER"
					}
					className="w-full px-6 py-4 bg-primary-dark hover:bg-red-950 text-white font-bold text-lg rounded-md shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<svg
						className="w-6 h-6"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path d="M22.56,12.25C22.56,11.47 22.49,10.72 22.36,10H12.27V14.1H18.19C17.94,15.55 17.27,16.79 16.25,17.52V20.31H19.94C21.72,18.69 22.56,15.79 22.56,12.25Z" />
						<path d="M12.27,24C15.3,24 17.86,23.03 19.94,21.45L16.25,18.66C15.29,19.31 13.97,19.74 12.27,19.74C9.35,19.74 6.83,17.88 5.91,15.22H2.13V18.01C4.03,21.66 7.81,24 12.27,24Z" />
						<path d="M5.91,14.1C5.66,13.32 5.53,12.5 5.53,11.69C5.53,10.88 5.66,10.06 5.91,9.28V6.49H2.13C1.43,7.89 1,9.74 1,11.69C1,13.64 1.43,15.49 2.13,16.9L5.91,14.1Z" />
						<path d="M12.27,4.63C14.07,4.63 15.42,5.26 16.48,6.27L19.99,2.76C17.86,0.98 15.3,0 12.27,0C7.81,0 4.03,2.34 2.13,6L5.91,8.79C6.83,6.13 9.35,4.63 12.27,4.63Z" />
					</svg>
					{isProcessingLogin
						? "Processing..."
						: "Sign in with Google"}
				</button>

				<p className="text-xs text-[var(--color-grey)] mt-8">
					By signing in, you agree to our terms of service.
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
