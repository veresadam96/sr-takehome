export async function register() {
  // Only run in the Node.js runtime — the libsql/Drizzle client is not
  // available on the edge runtime.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { seedDatabase } = await import("./db/seed");
    await seedDatabase();
  }
}
