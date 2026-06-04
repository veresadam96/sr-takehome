"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStoredUser } from "./hooks/useStoredUser";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useStoredUser();

  useEffect(() => {
    router.replace(user ? "/posts" : "/login");
  }, [router, user]);

  return null;
}
