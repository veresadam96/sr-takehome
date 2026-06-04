import { eq } from "drizzle-orm";

import { db } from "../index";
import { usersTable } from "../schema";

export async function selectUserByUsername(username: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);
  return user;
}
