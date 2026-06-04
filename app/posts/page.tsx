import { selectAllPosts } from "@/src/db/repositories/posts";

import PostList from "./PostList";

export default async function PostsPage() {
  const posts = await selectAllPosts();
  return <PostList posts={posts} />;
}
