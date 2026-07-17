import { usePostStore, getAllTags } from '@/store/postStore'
import TagCloud from '@/components/post/TagCloud'

export default function TagsPage() {
  const posts = usePostStore((state) => state.posts)
  const tags = getAllTags(posts)
  return (
    <div className="py-4">
      <div className="card-base p-6 md:p-9 mb-4 animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">标签</h1>
        <p className="text-muted-foreground">共 {tags.length} 个标签</p>
      </div>
      <div className="card-base p-6 md:p-9 animate-fade-up" style={{ animationDelay: 'calc(var(--content-delay) + 50ms)' }}>
        <TagCloud tags={tags} />
      </div>
    </div>
  )
}
