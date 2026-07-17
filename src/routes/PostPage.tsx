import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePostStore, getPostBySlug, getPosts } from '@/store/postStore'
import PostContent from '@/components/post/PostContent'
import TableOfContents from '@/components/post/TableOfContents'
import SplitText from '@/components/SplitText'
import { extractHeadings } from '@/lib/toc'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const posts = usePostStore((state) => state.posts)
  const post = slug ? getPostBySlug(posts, slug) : undefined
  // hooks 必须在提前 return 之前调用
  const tocItems = useMemo(() => (post ? extractHeadings(post.content) : []), [post])

  if (!post) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-4xl font-bold mb-3">404</h1>
        <p className="text-muted-foreground mb-4">这篇文章不存在或已被移除。</p>
        <Button asChild variant="link">
          <Link to="/">返回首页</Link>
        </Button>
      </div>
    )
  }

  const date = new Date(post.createdAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
  const sortedPosts = getPosts(posts)
  const currentIndex = sortedPosts.findIndex(p => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null
  const wordCount = post.content.replace(/\s+/g, '').length
  const readTime = Math.max(1, Math.ceil(wordCount / 300))

  return (
    <div className="py-4 2xl:grid 2xl:grid-cols-[minmax(0,1fr)_14rem] 2xl:gap-6 2xl:items-start">
      <div className="min-w-0">
        {/* 返回链接:纯文字形态置于卡片正上方,与卡片左缘对齐,间距统一 mb-4 */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 mb-4 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />返回
        </Link>

        <article className="card-base p-6 md:p-9">
          <SplitText
            text={post.title}
            tag="h1"
            className="font-bold text-3xl md:text-4xl mb-3 text-foreground"
            splitType="chars"
            delay={25}
            duration={0.6}
            from={{ opacity: 0, y: 12 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px"
            textAlign="left"
          />

          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-8 pb-6 border-b border-border/60">
            <span>{date}</span>
            <span className="text-border">/</span>
            <span>{wordCount} 字</span>
            <span className="text-border">/</span>
            <span>{readTime} 分钟</span>
            <span className="text-border">/</span>
            <div className="flex gap-1.5">
              {post.tags.map(tag => (
                <Link key={tag} to={`/tags/${tag}`}>
                  <Badge variant="secondary" className="font-normal hover:bg-primary/10 hover:text-primary transition-colors">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          <PostContent content={post.content} />
        </article>

        {/* 上一篇/下一篇 */}
        {(prevPost || nextPost) && (
          <nav className="mt-6 grid grid-cols-2 gap-4">
            {nextPost ? (
              <Link to={`/posts/${nextPost.slug}`} className="card-base p-4 group">
                <div className="flex items-center text-xs text-muted-foreground mb-1.5">
                  <ArrowLeft className="h-3 w-3 mr-1" />上一篇
                </div>
                <div className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors line-clamp-2">
                  {nextPost.title}
                </div>
              </Link>
            ) : <div />}
            {prevPost ? (
              <Link to={`/posts/${prevPost.slug}`} className="card-base p-4 group text-right">
                <div className="flex items-center justify-end text-xs text-muted-foreground mb-1.5">
                  下一篇<ArrowRight className="h-3 w-3 ml-1" />
                </div>
                <div className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.title}
                </div>
              </Link>
            ) : <div />}
          </nav>
        )}
      </div>

      {/* 右栏:TOC 目录(2xl 断点显示,sticky 定位) */}
      {tocItems.length > 0 && (
        <aside className="hidden 2xl:block">
          <div className="sticky top-20">
            <TableOfContents items={tocItems} />
          </div>
        </aside>
      )}
    </div>
  )
}
