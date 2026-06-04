"use server";

import { insertPost } from "@/src/db/repositories/posts";
import { selectUserByUsername } from "@/src/db/repositories/users";

export async function isAdmin(username: string) {
  const user = await selectUserByUsername(username);
  return user?.role === "admin";
}

type CreatePostResult = { ok: true } | { ok: false; error: string };

export async function createPost(
  username: string,
  title: string,
  description: string,
): Promise<CreatePostResult> {
  // Authorization is enforced server-side, not just via the client redirect.
  const user = await selectUserByUsername(username);
  if (user?.role !== "admin") {
    return { ok: false, error: "Not authorized." };
  }

  await insertPost({ title, description });
  return { ok: true };
}
