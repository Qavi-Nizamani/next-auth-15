// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticate } from "@/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await authenticate(email, password);

    if (result.error) {
      setError(result.error);
    } else {
      // Redirect on success
      router.push("/");
      router.refresh(); // This refreshes the current route and fetches new data from the server
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}
