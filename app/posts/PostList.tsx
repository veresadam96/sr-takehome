"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useStoredUser } from "../hooks/useStoredUser";
import { isAdmin } from "./actions";
import PostForm from "./PostForm";

type Post = {
  id: number;
  title: string;
  description: string;
};

function PostCard({ post }: { post: Post }) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardActionArea onClick={() => setOpen((v) => !v)}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={
              open
                ? {
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word"
                }
                : {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }
            }
          >
            {post.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function PostList({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [user] = useStoredUser();
  const [mounted, setMounted] = useState(false);
  const [admin, setAdmin] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    let active = true;
    isAdmin(user).then((ok) => {
      if (active) setAdmin(ok);
    });
    return () => {
      active = false;
    };
  }, [mounted, user, router]);

  return (
    <Box sx={{ flex: 1, minHeight: 0, display: "flex", overflow: "hidden" }}>
      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", py: 4 }}>
        <Stack spacing={2} sx={{ width: "50%", mx: "auto" }}>
          {posts.length === 0 ? (
            <Typography color="text.secondary" sx={{ textAlign: "center" }}>
              No posts yet.
            </Typography>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </Stack>
      </Box>

      {admin && user && (
        <Box
          sx={{
            width: 360,
            flexShrink: 0,
            p: 2,
            overflowY: "auto",
            borderLeft: 1,
            borderColor: "divider",
          }}
        >
          <PostForm user={user} />
        </Box>
      )}
    </Box>
  );
}
