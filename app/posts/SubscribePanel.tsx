"use client";

import { useEffect, useState } from "react";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import { getSubscribedChannels, subscribe } from "./actions";
import { CHANNELS, CHANNEL_LABELS } from "./channels";
import type { ChannelType } from "@/src/channels/channels";

export default function SubscribePanel({ user }: { user: string }) {
  const [open, setOpen] = useState(false);
  const [subscribed, setSubscribed] = useState<ChannelType[]>([]);
  const [channel, setChannel] = useState<ChannelType>("email");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const available = CHANNELS.filter((c) => !subscribed.includes(c));

  useEffect(() => {
    let active = true;
    getSubscribedChannels(user).then((channels) => {
      if (active) setSubscribed(channels);
    });
    return () => {
      active = false;
    };
  }, [user]);

  function reset() {
    setAddress("");
    setError(null);
    setSubmitting(false);
  }

  function handleOpen() {
    reset();
    setChannel(available[0]);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    reset();
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await subscribe(user, channel, address);

    if (!result.ok) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    setOpen(false);
    reset();
    setSubscribed((prev) => [...prev, channel]);
    setSuccess(`Subscribed to ${CHANNEL_LABELS[channel]}.`);
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        disabled={available.length === 0}
      >
        {available.length === 0 ? "All channels subscribed" : "Subscribe"}
      </Button>

      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess(null)}
          sx={{ mt: 2 }}
        >
          {success}
        </Alert>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Subscribe to alerts</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                select
                label="Channel"
                value={channel}
                onChange={(e) => setChannel(e.target.value as ChannelType)}
                fullWidth
              >
                {available.map((c) => (
                  <MenuItem key={c} value={c}>
                    {CHANNEL_LABELS[c]}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Email"
                type="email"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                fullWidth
              />

              {error && <Alert severity="error">{error}</Alert>}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? "Subscribing…" : "Subscribe"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
