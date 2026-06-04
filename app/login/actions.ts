"use server";

import { selectUserByUsername } from "@/src/db/repositories/users";

type LoginResult =
  | { ok: true; username: string }
  | { ok: false; error: string };

export async function login(
  username: string,
  password: string,
): Promise<LoginResult> {
  const user = await selectUserByUsername(username);

  if (!user || user.password !== password) {
    return { ok: false, error: "Invalid username or password." };
  }

  return { ok: true, username: user.username };
}
