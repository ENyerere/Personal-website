import { Moon, Sun } from 'lucide-react'
import { flushSync } from 'react-dom'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'

/** View Transitions API(TS 标准库尚未内置类型,此处最小声明) */
interface ViewTransition {
  ready: Promise<void>
}
type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition
}

/**
 * 主题切换:新主题以圆形 clip-path 从点击位置扩散揭示(View Transitions API)。
 * 降级链:prefers-reduced-motion 或浏览器不支持 → 瞬时切换,行为与此前一致。
 */
export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startViewTransition = (document as DocumentWithViewTransition).startViewTransition
    if (reduced || !startViewTransition) {
      toggleTheme()
      return
    }

    // 键盘激活时 clientX/Y 为 0,退回按钮中心
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX || rect.left + rect.width / 2
    const y = e.clientY || rect.top + rect.height / 2

    const transition = startViewTransition.call(document, () => {
      flushSync(() => toggleTheme())
    })

    // 半径取到最远角,保证圆形覆盖全屏
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle} aria-label="切换主题">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
