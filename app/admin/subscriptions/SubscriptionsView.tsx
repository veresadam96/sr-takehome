"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useStoredUser } from "@/app/hooks/useStoredUser";
import { isAdmin } from "@/app/posts/actions";

type SubscriptionRow = {
  id: number;
  username: string;
  channel: string;
  address: string;
};

export default function SubscriptionsView({
  subscriptions,
}: {
  subscriptions: SubscriptionRow[];
}) {
  const router = useRouter();
  const [user] = useStoredUser();
  const [mounted, setMounted] = useState(false);
  const [authorized, setAuthorized] = useState(false);

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
      if (!active) return;
      if (ok) setAuthorized(true);
      else router.replace("/login");
    });
    return () => {
      active = false;
    };
  }, [mounted, user, router]);

  if (!authorized) return null;

  return (
    <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", py: 4 }}>
      <Stack spacing={2} sx={{ width: "80%", mx: "auto" }}>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="h5" component="h1">
            Subscriptions
          </Typography>
          <Button variant="outlined" onClick={() => router.push("/posts")}>
            Back to posts
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Channel</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No subscriptions yet.
                  </TableCell>
                </TableRow>
              ) : (
                subscriptions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.username}</TableCell>
                    <TableCell>{s.channel}</TableCell>
                    <TableCell>{s.address}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}
