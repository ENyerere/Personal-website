/**
 * 内容管线:构建期加载 src/content/posts/*.md。
 * 写作即提交——新增文章只需添加一个 .md 文件,无需改动任何代码。
 * front matter 字段约定见 README「写作指南」。
 */
import type { Post } from '@/store/postStore'
import { parseFrontMatter } from '@/lib/frontMatter'
import postRevisions from 'virtual:post-revisions'

const files = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function toIso(dateStr: string, fallback: string): string {
  const d = new Date(dateStr)
  return Number.isNaN(d.getTime()) ? fallback : d.toISOString()
}

/** 组装版本信息:git 不可用 → null(页面隐藏 rev 行);未提交 → 空 hash(页面显示 draft) */
function toRevision(filename: string): Post['revision'] {
  if (!postRevisions.repoUrl) return null
  const entry = postRevisions.revisions[filename]
  return {
    hash: entry?.hash ?? '',
    count: entry?.count ?? 0,
    historyUrl: entry?.hash
      ? `${postRevisions.repoUrl}/commits/${postRevisions.branch}/src/content/posts/${filename}.md`
      : '',
  }
}

function toPost(path: string, raw: string): Post | null {
  const { data, body } = parseFrontMatter(raw)
  const filename = path.split('/').pop()!.replace(/\.md$/, '')
  const slug = String(data.slug || filename)
  const title = String(data.title || '')

  if (!title) {
    console.warn(`[content] ${path}: 缺少 title,已跳过`)
    return null
  }

  const createdAt = toIso(String(data.createdAt || ''), '1970-01-01T00:00:00.000Z')

  return {
    id: slug,
    slug,
    title,
    excerpt: String(data.excerpt || ''),
    content: body.trim(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    createdAt,
    updatedAt: toIso(String(data.updatedAt || ''), createdAt),
    published: data.published !== false,
    series: data.series ? String(data.series) : undefined,
    revision: toRevision(filename),
  }
}

export const contentPosts: Post[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post): post is Post => post !== null)
