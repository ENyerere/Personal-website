import { usePostStore, getArchives } from '@/store/postStore'
import ArchiveTimeline from '@/components/post/ArchiveTimeline'

export default function ArchivesPage() {
  const posts = usePostStore((state) => state.posts)
  const archives = getArchives(posts)
  const total = archives.reduce((sum, g) => sum + g.posts.length, 0)

  return (
    <div className="py-4">
      <div className="card-base p-6 md:p-9 mb-4 animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">归档</h1>
        <p className="text-muted-foreground">共 {total} 篇文章</p>
      </div>
      <ArchiveTimeline archives={archives} />
    </div>
  )
}
