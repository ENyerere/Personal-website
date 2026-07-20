import { createElement, useLayoutEffect, useRef, useState } from 'react'
import { wrapLines } from '@/lib/lineReveal'

interface LineRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  className?: string
}

/**
 * 标题逐行揭示(全站唯一签名动效,仅用于文章页 H1 等签名位置)。
 * - useLayoutEffect 内同步完成行包裹,首帧即处于 translateY(103%) 隐藏态,无闪烁
 * - 双 rAF 后加 ready 类触发过渡:1400ms,cubic-bezier(0.19,1,0.22,1),逐行错峰
 * - prefers-reduced-motion:不拆分、不动画,标题直接静态呈现
 * - 视觉文本置于 aria-hidden 的行 span,元素本身以 aria-label 提供无障碍文本
 */
export default function LineReveal({ text, as = 'h1', className = '' }: LineRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    wrapLines(el)
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true))
    })
    return () => cancelAnimationFrame(raf)
  }, [text])

  return createElement(
    as,
    {
      ref,
      className: `${className}${ready ? ' line-reveal-ready' : ''}`,
      'aria-label': text,
    },
    text
  )
}
