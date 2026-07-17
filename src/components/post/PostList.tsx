import PostCard from './PostCard'
import type { Post } from '@/store/postStore'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="card-base py-16 text-center">
        <p className="text-muted-foreground">还没有文章。</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col rounded-[var(--radius-large)] py-1 md:py-0 md:gap-4 mb-4">
      {posts.map((post, index) => (
        // fuwari 式错峰入场:animation-delay = --content-delay + N * 50ms
        <div
          key={post.id}
          className="animate-fade-up"
          style={{ animationDelay: `calc(var(--content-delay) + ${index} * 50ms)` }}
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}
