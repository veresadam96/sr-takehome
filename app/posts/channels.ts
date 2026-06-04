import type { ChannelType } from "@/src/channels/channels";

export const CHANNELS: readonly ChannelType[] = ["email", "slack"];

export const CHANNEL_LABELS: Record<ChannelType, string> = {
  email: "Email",
  slack: "Slack",
};
