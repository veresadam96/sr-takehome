import { db } from "./index";
import { usersTable } from "./schema";

const seedUsers: (typeof usersTable.$inferInsert)[] = [
  { username: "user-foo", password: "foo", role: "user" },
  { username: "user-bar", password: "bar", role: "user" },
  { username: "admin", password: "admin", role: "admin" },
];

/**
 * Inserts the base set of users. Idempotent: `onConflictDoNothing` keeps it
 * safe to run on every server start without violating the username unique
 * constraint.
 */
export async function seedDatabase() {
  await db.insert(usersTable).values(seedUsers).onConflictDoNothing();
}
