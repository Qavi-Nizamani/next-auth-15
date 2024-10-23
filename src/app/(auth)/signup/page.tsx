// Create a sign up form
"use client";

import React from "react";

const page = () => {
  // extract form data
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    console.log(formData.get("email"));

    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log("data", data);
  };

  return (
    <form onSubmit={handleRegister}>
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <label>
        Verify Password
        <input name="confirmPassword" type="password" />
      </label>
      <button>Sign Up</button>
    </form>
  );
};

export default page;
