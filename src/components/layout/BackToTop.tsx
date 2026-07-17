import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BackToTopProps {
  visible: boolean
  onClick: () => void
}

export default function BackToTop({ visible, onClick }: BackToTopProps) {
  if (!visible) return null
  return (
    <Button
      variant="default"
      size="icon"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full shadow-md opacity-90 hover:opacity-100"
      aria-label="回到顶部"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}
