"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface AuthContextValue {
	user: User | null;
	loading: boolean;
	signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
	user: null,
	loading: true,
	signOutUser: async () => {
		throw new Error("signOutUser function not implemented");
	},
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const signOutUser = async () => {
		try {
			await auth.signOut();
			setUser(null);
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	useEffect(() => {
		// Subscribe once, then update context
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

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
