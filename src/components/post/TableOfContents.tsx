import { useEffect, useState } from 'react'
import type { TocItem } from '@/lib/toc'

interface TableOfContentsProps {
  items: TocItem[]
}

/**
 * 文章页右栏目录(hairline 风格)
 * - xl 断点显示、sticky 定位(由外层布局控制)
 * - 当前章节:字重 + 左侧短粗线指示,不用色块
 * - IntersectionObserver 追踪阅读位置;点击平滑滚动,reduced-motion 时瞬时跳转
 */
export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      // 顶部让出 sticky 头部,底部收缩,使“当前章节”落在视口上 1/3 区域
      { rootMargin: '-96px 0px -66% 0px', threshold: 0 }
    )
    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  const scrollToHeading = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    setActiveId(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <nav aria-label="文章目录">
      <div className="font-mono text-xs tracking-[0.08em] text-muted-foreground mb-4">目录</div>
      <ul className="space-y-0.5 text-sm border-l border-border">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={scrollToHeading(item.id)}
                aria-current={active ? 'location' : undefined}
                className={[
                  'block py-1.5 -ml-px border-l-2 transition-colors leading-6',
                  item.depth === 3 ? 'pl-8' : 'pl-4',
                  active
                    ? 'border-foreground text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
