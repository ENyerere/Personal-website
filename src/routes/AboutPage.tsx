import { profile } from '@/data/profile'
import { skills } from '@/data/skills'
import { projects } from '@/data/projects'
import { socials } from '@/data/socials'

/**
 * 关于页:单栏阅读宽度,hairline 分节,无卡片。
 * 节标题用等宽小标签,内容用正文系统。
 */
export default function AboutPage() {
  return (
    <div className="py-10 md:py-16 max-w-[42rem]">
      {/* 个人档案 */}
      <header className="mb-12">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-16 h-16 rounded-sm object-cover mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile.name}</h1>
        <p className="font-mono text-sm text-muted-foreground mb-6">{profile.role}</p>
        <p className="leading-8 text-foreground/90">{profile.about}</p>
      </header>

      {/* 技能 */}
      <section className="border-t border-border pt-8 mt-8">
        <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase mb-4">
          技能 / Skills
        </h2>
        <p className="font-mono text-sm leading-8">{skills.join(' · ')}</p>
      </section>

      {/* 项目 */}
      <section className="border-t border-border pt-8 mt-8">
        <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase mb-2">
          项目 / Projects
        </h2>
        <div className="divide-y divide-border/60">
          {projects.map((project) => (
            <div key={project.title} className="py-5">
              <h3 className="text-lg font-semibold mb-1.5">{project.title}</h3>
              <p className="text-muted-foreground leading-7 mb-3">{project.description}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {project.techStack.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 联系 */}
      <section className="border-t border-border pt-8 mt-8">
        <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase mb-4">
          联系 / Contact
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {socials.map((social) => {
            const isHttp = social.url.startsWith('http')
            return (
              <a
                key={social.label}
                href={social.url}
                target={isHttp ? '_blank' : undefined}
                rel={isHttp ? 'noopener noreferrer' : undefined}
                className="u-line text-foreground"
              >
                {social.label}
              </a>
            )
          })}
        </div>
      </section>
    </div>
  )
}
