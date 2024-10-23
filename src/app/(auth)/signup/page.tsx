// Create a sign up form

import React from "react";

const page = () => {
  return (
    <form
      action={async (formData) => {
        "use server";
        console.log(formData);
        // await signIn("credentials", formData);
      }}
    >
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
        <input name="password" type="password" />
      </label>
      <button>Sign Up</button>
    </form>
  );
};

export default page;
