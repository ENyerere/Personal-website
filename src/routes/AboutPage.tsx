import { Badge } from '@/components/ui/badge'
import { profile } from '@/data/profile'
import { skills } from '@/data/skills'
import { projects } from '@/data/projects'
import { socials } from '@/data/socials'

/** 错峰入场:第 N 张卡片延迟 --content-delay + N*50ms */
function entranceStyle(index: number) {
  return { animationDelay: `calc(var(--content-delay) + ${index} * 50ms)` }
}

export default function AboutPage() {
  return (
    <div className="py-4 space-y-4">
      {/* 个人信息卡片 */}
      <div className="card-base p-6 md:p-9 animate-fade-up" style={entranceStyle(0)}>
        <div className="flex items-center gap-5 mb-6">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-border"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground mt-1">{profile.role}</p>
          </div>
        </div>
        <p className="text-lg leading-relaxed text-foreground/90">{profile.about}</p>
      </div>

      {/* 技能卡片 */}
      <div className="card-base p-6 md:p-9 animate-fade-up" style={entranceStyle(1)}>
        <h2 className="text-xl font-bold mb-4">技能</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <Badge key={skill} variant="secondary" className="font-normal">{skill}</Badge>
          ))}
        </div>
      </div>

      {/* 项目卡片 */}
      <div className="card-base p-6 md:p-9 animate-fade-up" style={entranceStyle(2)}>
        <h2 className="text-xl font-bold mb-6">项目</h2>
        <div>
          {projects.map((project, i) => (
            <div key={project.title} className={`py-5 ${i !== projects.length - 1 ? 'border-b border-border/60' : ''}`}>
              <h3 className="text-lg font-medium mb-1.5">{project.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map(tech => (
                  <Badge key={tech} variant="outline" className="font-normal text-xs">{tech}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 联系卡片 */}
      <div className="card-base p-6 md:p-9 animate-fade-up" style={entranceStyle(3)}>
        <h2 className="text-xl font-bold mb-4">联系</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {socials.map(social => {
            const isHttp = social.url.startsWith('http')
            return (
              <a
                key={social.label}
                href={social.url}
                target={isHttp ? '_blank' : undefined}
                rel={isHttp ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <i className={social.icon}></i>
                <span>{social.label}</span>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
