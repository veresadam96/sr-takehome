"use server";

import { insertPost } from "@/src/db/repositories/posts";
import {
  insertSubscription,
  selectSubscriptionsByUserId,
} from "@/src/db/repositories/subscriptions";
import { selectUserByUsername } from "@/src/db/repositories/users";
import type { ChannelType } from "@/src/channels/channels";

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

export async function getSubscribedChannels(
  username: string,
): Promise<ChannelType[]> {
  const user = await selectUserByUsername(username);
  if (!user) return [];

  const subscriptions = await selectSubscriptionsByUserId(user.id);
  return [...new Set(subscriptions.map((s) => s.channel as ChannelType))];
}

type SubscribeResult = { ok: true } | { ok: false; error: string };

export async function subscribe(
  username: string,
  channel: ChannelType,
  address: string,
): Promise<SubscribeResult> {
  const user = await selectUserByUsername(username);
  if (!user) {
    return { ok: false, error: "Not authenticated." };
  }

  const created = await insertSubscription({
    userId: user.id,
    channel,
    address,
  });

  if (!created) {
    return { ok: false, error: "You are already subscribed with this address." };
  }

  return { ok: true };
}
