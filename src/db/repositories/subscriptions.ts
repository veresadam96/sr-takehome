import { eq } from "drizzle-orm";

import { db } from "../index";
import { subscriptionsTable, usersTable } from "../schema";

export async function selectAllSubscriptions() {
  return db.select().from(subscriptionsTable);
}

export async function selectAllSubscriptionsWithUsername() {
  return db
    .select({
      id: subscriptionsTable.id,
      username: usersTable.username,
      channel: subscriptionsTable.channel,
      address: subscriptionsTable.address,
    })
    .from(subscriptionsTable)
    .innerJoin(usersTable, eq(subscriptionsTable.userId, usersTable.id));
}

export async function selectSubscriptionsByUserId(userId: number) {
  return db
    .select()
    .from(subscriptionsTable)
    .where(eq(subscriptionsTable.userId, userId));
}

export async function insertSubscription(
  subscription: typeof subscriptionsTable.$inferInsert,
) {
  // onConflictDoNothing relies on the unique (user_id, channel, address)
  // constraint: a duplicate subscription returns no row.
  const [created] = await db
    .insert(subscriptionsTable)
    .values(subscription)
    .onConflictDoNothing()
    .returning();
  return created;
}
