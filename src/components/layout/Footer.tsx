import { socials } from '@/data/socials'
import { profile } from '@/data/profile'

/**
 * 页脚:反转为墨色块 + 超大联系排版,形成「卷末」感。
 * 社交链接为纯文字 + 下划线生长动画(.u-line)。
 */
export default function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="w-full max-w-[var(--page-width)] mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="font-mono text-xs tracking-[0.08em] uppercase opacity-60 mb-4">
          Contact
        </div>
        <div className="text-4xl md:text-6xl font-bold tracking-[-0.03em] mb-8">
          {profile.name}
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-12">
          {socials.map((s) => {
            const isHttp = s.url.startsWith('http')
            return (
              <a
                key={s.label}
                href={s.url}
                target={isHttp ? '_blank' : undefined}
                rel={isHttp ? 'noopener noreferrer' : undefined}
                className="u-line text-lg md:text-xl"
              >
                {s.label}
              </a>
            )
          })}
          {/* RSS 订阅入口(构建期生成 feed.xml,BASE_URL 兼容 Pages 子路径) */}
          <a href={`${import.meta.env.BASE_URL}feed.xml`} className="u-line text-lg md:text-xl">
            RSS
          </a>
        </div>
        <div className="pt-6 border-t border-background/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-sm opacity-60">
          <p>&copy; {new Date().getFullYear()} {profile.name}</p>
          <p className="font-mono text-xs">manuscript · archival · precise</p>
        </div>
      </div>
    </footer>
  )
}
