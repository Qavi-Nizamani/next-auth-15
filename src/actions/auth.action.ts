"use server";

import { registerUser } from "@/services/auth.service";

export async function registerUserAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const data = await registerUser(email, password);

  return data;
}
