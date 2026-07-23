"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();

	useEffect(() => {
		// Authentication is disabled, so the former login URL goes to the
		// publicly accessible admin page instead.
		router.replace("/admin");
	}, [router]);

	return <p className="p-6 text-center">Opening admin page...</p>;
}
