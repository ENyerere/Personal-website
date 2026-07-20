import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePostStore, getPostBySlug, getPosts } from '@/store/postStore'
import PostContent from '@/components/post/PostContent'
import TableOfContents from '@/components/post/TableOfContents'
import LineReveal from '@/components/LineReveal'
import { extractHeadings } from '@/lib/toc'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const posts = usePostStore((state) => state.posts)
  const post = slug ? getPostBySlug(posts, slug) : undefined
  // hooks 必须在提前 return 之前调用
  const tocItems = useMemo(() => (post ? extractHeadings(post.content) : []), [post])

  if (!post) {
    return (
      <div className="py-24">
        <p className="font-mono text-xs text-muted-foreground tracking-[0.08em] mb-4">404</p>
        <h1 className="text-4xl font-bold mb-4">文章不存在</h1>
        <p className="text-muted-foreground mb-8">这篇文章不存在或已被移除。</p>
        <Link to="/" className="u-line text-foreground">
          ← 返回首页
        </Link>
      </div>
    )
  }

  const date = post.createdAt.slice(0, 10)
  const sortedPosts = getPosts(posts)
  const currentIndex = sortedPosts.findIndex(p => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null
  const wordCount = post.content.replace(/\s+/g, '').length
  const readTime = Math.max(1, Math.ceil(wordCount / 300))

  return (
    <div className="py-4 md:py-6 2xl:grid 2xl:grid-cols-[1fr_minmax(0,42rem)_1fr] 2xl:gap-8">
      {/* 中栏:居中阅读栏(measure 约 68 字符) */}
      <div className="2xl:col-start-2 w-full max-w-[42rem] mx-auto 2xl:mx-0">
        {/* 返回链接:纯文字,与内容左缘对齐 */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 mb-10 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />返回
        </Link>

        <article>
          {/* 签名动效:标题逐行揭示 */}
          <LineReveal
            text={post.title}
            as="h1"
            className="text-3xl md:text-4xl font-bold mb-8"
          />

          {/* YAML 元数据块:等宽、固定宽标签 + 内联值 */}
          <div className="font-mono text-sm leading-7 mb-8" aria-label="文章元数据">
            <div className="flex">
              <span className="w-[6em] shrink-0 text-muted-foreground">date:</span>
              <span>{date}</span>
            </div>
            <div className="flex">
              <span className="w-[6em] shrink-0 text-muted-foreground">tags:</span>
              <span>
                [
                {post.tags.map((tag, i) => (
                  <span key={tag}>
                    {i > 0 && ', '}
                    <Link to={`/tags/${tag}`} className="hover:underline underline-offset-2">
                      {tag}
                    </Link>
                  </span>
                ))}
                ]
              </span>
            </div>
            <div className="flex">
              <span className="w-[6em] shrink-0 text-muted-foreground">words:</span>
              <span>{wordCount}</span>
            </div>
            <div className="flex">
              <span className="w-[6em] shrink-0 text-muted-foreground">time:</span>
              <span>{readTime} min</span>
            </div>
            {/* 版本历史:短 hash 链到 GitHub 该文件的提交历史;未提交显示 draft */}
            {post.revision && (
              <div className="flex">
                <span className="w-[6em] shrink-0 text-muted-foreground">rev:</span>
                {post.revision.hash ? (
                  <span>
                    <a
                      href={post.revision.historyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline underline-offset-2"
                    >
                      {post.revision.hash}
                    </a>
                    {post.revision.count > 1 && (
                      <span className="text-muted-foreground"> (r{post.revision.count})</span>
                    )}
                  </span>
                ) : (
                  <span className="text-muted-foreground">draft</span>
                )}
              </div>
            )}
          </div>

          {/* hairline 后的正文 */}
          <div className="border-t border-border pt-2">
            <PostContent content={post.content} />
          </div>
        </article>

        {/* 上一篇/下一篇:hairline 文字链接行 */}
        {(prevPost || nextPost) && (
          <nav className="border-t border-border mt-16 pt-6 flex justify-between gap-6 text-sm">
            {nextPost ? (
              <Link to={`/posts/${nextPost.slug}`} className="group max-w-[45%]">
                <span className="font-mono text-xs text-muted-foreground flex items-center gap-1 mb-1.5">
                  <ArrowLeft className="h-3 w-3" />上一篇
                </span>
                <span className="group-hover:underline underline-offset-4 line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : <span />}
            {prevPost ? (
              <Link to={`/posts/${prevPost.slug}`} className="group max-w-[45%] text-right ml-auto">
                <span className="font-mono text-xs text-muted-foreground flex items-center justify-end gap-1 mb-1.5">
                  下一篇<ArrowRight className="h-3 w-3" />
                </span>
                <span className="group-hover:underline underline-offset-4 line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : <span />}
          </nav>
        )}
      </div>

      {/* 右栏:TOC 目录(2xl 断点显示,sticky 定位) */}
      {tocItems.length > 0 && (
        <aside className="hidden 2xl:block 2xl:col-start-3">
          <div className="sticky top-20">
            <TableOfContents items={tocItems} />
          </div>
        </aside>
      )}
    </div>
  )
}
