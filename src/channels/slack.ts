import { Channel } from "./channels";

export const slackChannel: Channel = {
  async send(target, message) {
    return Promise.resolve({ ok: true });
  }
}
