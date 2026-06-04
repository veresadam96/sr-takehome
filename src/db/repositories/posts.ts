import { desc } from "drizzle-orm";
import { db } from "../index";
import { postsTable } from "../schema";

export async function insertPost(post: typeof postsTable.$inferInsert) {
  const [created] = await db.insert(postsTable).values(post).returning();
  return created;
}

export async function selectAllPosts() {
  return db.select().from(postsTable).orderBy(desc(postsTable.id));
}
