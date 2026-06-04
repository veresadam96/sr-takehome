import { selectAllSubscriptionsWithUsername } from "@/src/db/repositories/subscriptions";

import SubscriptionsView from "./SubscriptionsView";

export default async function AdminSubscriptionsPage() {
  const subscriptions = await selectAllSubscriptionsWithUsername();
  return <SubscriptionsView subscriptions={subscriptions} />;
}
