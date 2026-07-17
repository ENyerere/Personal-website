import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'
import { usePostStore, getAllTags } from '@/store/postStore'

export default function SideBar() {
  const posts = usePostStore((state) => state.posts)
  const tags = getAllTags(posts)

  return (
    <div id="sidebar" className="w-full">
      {/* Profile 卡片 */}
      <div className="flex flex-col w-full gap-4 mb-4">
        <div className="card-base p-3">
          <Link to="/about" className="group block relative mx-auto mt-1 mb-3 max-w-[12rem] overflow-hidden rounded-xl active:scale-95">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="mx-auto w-full h-full object-cover"
            />
          </Link>
          <div className="px-2">
            <div className="font-bold text-xl text-center mb-1">{profile.name}</div>
            <div className="h-1 w-5 bg-primary mx-auto rounded-full mb-2"></div>
            <div className="text-center text-muted-foreground mb-2.5 text-sm">{profile.role}</div>
            <div className="flex flex-wrap gap-2 justify-center mb-1">
              {socials.map((s) => {
                const isHttp = s.url.startsWith('http')
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    target={isHttp ? '_blank' : undefined}
                    rel={isHttp ? 'noopener noreferrer' : undefined}
                    aria-label={s.label}
                    className="btn-regular rounded-lg h-10 w-10 flex items-center justify-center active:scale-90"
                  >
                    <i className={s.icon}></i>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 标签列表（sticky，top-20 让出 4rem 头部高度，避免滚动时被 sticky 头部遮挡） */}
      <div className="flex flex-col w-full gap-4 sticky top-20">
        <div className="card-base p-4">
          <div className="font-bold text-lg mb-3">标签</div>
          <div className="flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="btn-regular rounded-md px-2.5 py-1 text-sm flex items-center gap-1.5 active:scale-95"
              >
                <span>{tag}</span>
                <span className="text-muted-foreground text-xs">{count}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
