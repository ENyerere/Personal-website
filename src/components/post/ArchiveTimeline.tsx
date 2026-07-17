import { Link } from 'react-router-dom'
import type { Post } from '@/store/postStore'

interface ArchiveTimelineProps {
  archives: { year: number; posts: Post[] }[]
}

export default function ArchiveTimeline({ archives }: ArchiveTimelineProps) {
  if (archives.length === 0) {
    return (
      <div className="card-base py-16 text-center">
        <p className="text-muted-foreground">还没有文章。</p>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      {archives.map(({ year, posts }, index) => (
        <div
          key={year}
          className="card-base p-6 md:p-9 animate-fade-up"
          style={{ animationDelay: `calc(var(--content-delay) + ${index + 1} * 50ms)` }}
        >
          <h2 className="text-2xl font-bold mb-6">
            {year}
            <span className="ml-2 text-base font-normal text-muted-foreground">{posts.length} 篇</span>
          </h2>
          <ul>
            {posts.map(post => {
              const date = new Date(post.createdAt).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })
              return (
                <li key={post.id} className="flex items-baseline gap-4 py-3 border-b border-border/60 last:border-0">
                  <span className="text-sm text-muted-foreground whitespace-nowrap w-20">{date}</span>
                  <Link to={`/posts/${post.slug}`} className="text-foreground/90 hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
