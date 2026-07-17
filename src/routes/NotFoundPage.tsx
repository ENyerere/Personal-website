import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-8">页面不存在或已被移除。</p>
      <Button asChild>
        <Link to="/"><ArrowLeft className="h-4 w-4 mr-2" />返回首页</Link>
      </Button>
    </div>
  )
}
