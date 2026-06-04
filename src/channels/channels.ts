import { emailChannel } from "./email";
import { slackChannel } from "./slack";

export type ChannelType =
  "slack" |
  "email";

export interface Channel {
  send(target: string, message: string): Promise<unknown>;
}

const channels: Record<ChannelType, Channel> = {
  "slack": slackChannel,
  "email": emailChannel,
}

export function sendMessage(type: ChannelType, target: string, message: string) {
  return channels[type].send(target, message);
}
