import { socials } from '@/data/socials'
import { profile } from '@/data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-border/60 mt-20">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-8 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <div className="flex items-center gap-5">
          {socials.map((s) => {
            const isHttp = s.url.startsWith('http')
            return (
              <a
                key={s.label}
                href={s.url}
                target={isHttp ? '_blank' : undefined}
                rel={isHttp ? 'noopener noreferrer' : undefined}
                className="hover:text-primary transition-colors"
                aria-label={s.label}
              >
                <i className={s.icon}></i>
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
