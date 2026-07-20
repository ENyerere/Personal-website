import PostCard from './PostCard'
import type { Post } from '@/store/postStore'

interface PostListProps {
  posts: Post[]
  /** 判断条目是否因过滤未命中而衰减显示 */
  isDimmed?: (post: Post) => boolean
}

export default function PostList({ posts, isDimmed }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-16 border-y border-border">
        <p className="text-muted-foreground font-mono text-sm">还没有文章。</p>
      </div>
    )
  }
  return (
    <div className="divide-y divide-border border-b border-border mb-4">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} dimmed={isDimmed?.(post) ?? false} />
      ))}
    </div>
  )
}
