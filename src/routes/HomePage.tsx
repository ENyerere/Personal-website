import { usePostStore, getPosts } from '@/store/postStore'
import PostList from '@/components/post/PostList'

export default function HomePage() {
  const posts = usePostStore((state) => state.posts)
  const sortedPosts = getPosts(posts)

  return (
    <div className="py-4">
      <PostList posts={sortedPosts} />
    </div>
  )
}
