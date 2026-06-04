import { Channel } from "./channels";

export const emailChannel: Channel = {
  async send(target, message) {
    return Promise.resolve({ ok: true });
  }
}
