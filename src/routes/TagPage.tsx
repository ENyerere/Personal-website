import { useParams, Link } from 'react-router-dom'
import { usePostStore, getPostsByTag } from '@/store/postStore'
import PostList from '@/components/post/PostList'
import { ArrowLeft } from 'lucide-react'

export default function TagPage() {
  const { tag } = useParams<{ tag: string }>()
  const posts = usePostStore((state) => state.posts)
  const filtered = tag ? getPostsByTag(posts, tag) : []

  return (
    <div className="py-4">
      {/* 返回链接:纯文字形态置于卡片正上方,与卡片左缘对齐,间距统一 mb-4 */}
      <Link
        to="/tags"
        className="inline-flex items-center gap-1.5 mb-4 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />所有标签
      </Link>
      <div className="card-base p-6 md:p-9 mb-4 animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-muted-foreground font-normal">#</span>{tag}
        </h1>
        <p className="text-muted-foreground">共 {filtered.length} 篇文章</p>
      </div>
      <PostList posts={filtered} />
    </div>
  )
}
