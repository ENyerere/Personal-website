import { Link, useLocation } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { profile } from '@/data/profile'

const navItems = [
  { label: '首页', to: '/' },
  { label: '归档', to: '/archives' },
  { label: '标签', to: '/tags' },
  { label: '关于', to: '/about' },
]

export default function Header() {
  const { pathname } = useLocation()
  const isActive = (to: string) => pathname === to

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="w-full max-w-[var(--page-width)] mx-auto px-6 md:px-8 flex h-16 items-center justify-between">
        <Link
          to="/"
          className="font-mono text-base font-semibold tracking-tight text-foreground hover:underline underline-offset-4"
        >
          {profile.name}
        </Link>

        {/* 桌面端导航:激活态 = 墨色 + 下划线,非激活 = 静音 */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-6">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.to}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.to}
                    aria-current={isActive(item.to) ? 'page' : undefined}
                    className={`text-sm transition-colors underline-offset-4 ${
                      isActive(item.to)
                        ? 'text-foreground font-medium underline'
                        : 'text-muted-foreground hover:text-foreground hover:underline'
                    }`}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="打开菜单">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l border-border">
              <nav className="flex flex-col gap-1 mt-10">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={isActive(item.to) ? 'page' : undefined}
                      className={`px-1 py-2.5 text-base transition-colors border-b border-border/60 ${
                        isActive(item.to)
                          ? 'text-foreground font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
