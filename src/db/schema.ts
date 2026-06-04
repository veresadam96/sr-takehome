import { int, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  password: text().notNull(),
  role: text({ enum: ["user", "admin"] }).notNull(),
});

export const postsTable = sqliteTable("posts", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
});

export const subscriptionsTable = sqliteTable(
  "subscriptions",
  {
    id: int().primaryKey({ autoIncrement: true }),
    userId: int("user_id")
      .notNull()
      .references(() => usersTable.id),
    channel: text().notNull(),
    address: text().notNull(),
  },
  (table) => [unique().on(table.userId, table.channel, table.address)],
);
