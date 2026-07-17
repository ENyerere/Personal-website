import { Link } from 'react-router-dom'

interface TagCloudProps {
  tags: { tag: string; count: number }[]
}

export default function TagCloud({ tags }: TagCloudProps) {
  if (tags.length === 0) {
    return <p className="text-muted-foreground">还没有标签。</p>
  }
  return (
    <div className="flex flex-wrap gap-2.5">
      {tags.map(({ tag, count }) => (
        <Link
          key={tag}
          to={`/tags/${tag}`}
          className="btn-regular rounded-md px-3 py-1.5 flex items-center gap-1.5 text-sm active:scale-95"
        >
          <span>{tag}</span>
          <span className="text-xs text-muted-foreground">{count}</span>
        </Link>
      ))}
    </div>
  )
}
