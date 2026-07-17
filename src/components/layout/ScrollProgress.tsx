import type { RefObject } from 'react'

interface ScrollProgressProps {
  scrollProgressRef: RefObject<HTMLElement | null>
}

export default function ScrollProgress({ scrollProgressRef }: ScrollProgressProps) {
  return (
    <div
      ref={scrollProgressRef as React.RefObject<HTMLDivElement>}
      className="fixed top-0 left-0 z-50 h-0.5 w-0 bg-primary transition-[width] duration-100 ease-out"
    />
  )
}
