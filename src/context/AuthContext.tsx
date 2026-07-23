"use client";

import React, {
	createContext,
	useContext,
	ReactNode,
} from "react";
import type { User } from "firebase/auth";

interface AuthContextValue {
	user: User | null;
	loading: boolean;
	signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
	user: null,
	loading: false,
	signOutUser: async () => {},
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	// Authentication is intentionally disabled so the site can run without
	// Firebase Auth configuration. Re-enable the Firebase auth subscription here
	// before restoring the route guards in the admin and blog editor pages.
	const user: User | null = null;
	const loading = false;
	const signOutUser = async () => {};

	return (
		<AuthContext.Provider value={{ user, loading, signOutUser }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook: use this to read { user, loading } anywhere
export const useAuth = () => {
	return useContext(AuthContext);
};
