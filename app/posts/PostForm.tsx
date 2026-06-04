"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { createPost } from "./actions";

export default function PostForm({ user }: { user: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await createPost(user, title, description);

    if (!result.ok) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    setTitle("");
    setDescription("");
    setSubmitting(false);
    router.refresh();
  }

  return (
    <Card>
      <CardContent>
        <Stack component="form" onSubmit={handleSubmit} spacing={2} sx={{ p: 1 }}>
          <Typography variant="h6" component="h2">
            Create post
          </Typography>

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
            multiline
            minRows={4}
          />

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
          >
            {submitting ? "Saving…" : "Create post"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
