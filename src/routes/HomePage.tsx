import { useState } from 'react'
import { usePostStore, getPosts, getAllTags } from '@/store/postStore'
import PostList from '@/components/post/PostList'

export default function HomePage() {
  const posts = usePostStore((state) => state.posts)
  const sortedPosts = getPosts(posts)
  const tags = getAllTags(posts)
  // null = 全部
  const [activeTag, setActiveTag] = useState<string | null>(null)

  return (
    <div className="pb-8">
      {/* 3px 粗规则线:页头与内容区之间的全站签名分隔(索引页专用) */}
      <div className="h-[3px] bg-foreground" aria-hidden="true" />

      <div className="pt-10 md:pt-16">
        {/* 档案统计行 */}
        <p className="font-mono text-xs text-muted-foreground tracking-[0.08em] mb-8">
          共 {sortedPosts.length} 篇手稿 · {tags.length} 个标签
        </p>

        {/* 标签过滤器:bracket 约定,激活态用 > < 包裹 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10" role="group" aria-label="按标签过滤">
          <button
            type="button"
            aria-pressed={activeTag === null}
            onClick={() => setActiveTag(null)}
            className={`font-mono text-sm transition-colors ${
              activeTag === null
                ? 'bracket-active text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            全部
          </button>
          {tags.map(({ tag }) => (
            <button
              key={tag}
              type="button"
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`font-mono text-sm transition-colors ${
                activeTag === tag
                  ? 'bracket-active text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 文章条目:未命中条目衰减为 0.3 透明度,不移除不重排 */}
        <PostList
          posts={sortedPosts}
          isDimmed={activeTag ? (post) => !post.tags.includes(activeTag) : undefined}
        />
      </div>
    </div>
  )
}
