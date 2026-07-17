import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Post } from '@/store/postStore'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
  const wordCount = post.content.replace(/\s+/g, '').length
  const readTime = Math.max(1, Math.ceil(wordCount / 300))

  return (
    <div className="card-base flex flex-col w-full rounded-[var(--radius-large)] overflow-hidden relative">
      <div className="pl-6 md:pl-9 pr-6 md:pr-2 pt-6 md:pt-7 pb-6 relative w-full md:w-[calc(100%_-_52px_-_12px)]">
        <Link
          to={`/posts/${post.slug}`}
          className="transition group w-full block font-bold mb-3 text-2xl md:text-3xl text-foreground hover:text-primary active:text-primary/80 before:w-1 before:h-5 before:rounded-md before:bg-primary before:absolute before:top-[35px] before:left-[18px] before:hidden md:before:block"
        >
          {post.title}
        </Link>

        {/* 元信息 */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
          <span>{date}</span>
          <span className="text-border">/</span>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map(tag => (
              <Link key={tag} to={`/tags/${tag}`}>
                <Badge variant="secondary" className="font-normal hover:bg-primary/10 hover:text-primary transition-colors">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* 摘要 */}
        <div className="text-muted-foreground mb-3.5 pr-4 line-clamp-2">
          {post.excerpt}
        </div>

        {/* 字数与阅读时间 */}
        <div className="text-sm text-muted-foreground/60 flex gap-4">
          <div>{wordCount} 字</div>
          <div>|</div>
          <div>{readTime} 分钟</div>
        </div>
      </div>

      {/* 右侧箭头按钮（桌面端） */}
      <Link
        to={`/posts/${post.slug}`}
        aria-label={post.title}
        className="hidden md:flex btn-regular w-[3.25rem] absolute right-3 top-3 bottom-3 rounded-xl items-center justify-center active:scale-95"
      >
        <ChevronRight className="h-7 w-7 text-primary" />
      </Link>
    </div>
  )
}
