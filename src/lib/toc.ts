/**
 * 文章目录(TOC)工具
 * 从 Markdown 源码提取 h2/h3 标题,生成与渲染侧一致的锚点 id。
 * id 生成规则:slugify(文本),同一 slug 重复出现时追加 -1/-2…
 * 两侧一致性:提取侧与渲染侧都通过「源码行号 → id」映射对齐,
 * 不依赖渲染期计数器(避免 StrictMode 双重渲染导致 id 漂移)。
 */

export interface TocItem {
  /** 标题层级:2 或 3 */
  depth: 2 | 3
  /** 标题纯文本 */
  text: string
  /** 锚点 id(与文章内标题元素的 id 一致) */
  id: string
  /** 标题在 Markdown 源码中的行号(1 起) */
  line: number
}

/** 标题文本 → URL 友好的 slug(保留中日韩等 Unicode 字母与数字) */
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}_-]/gu, '')
}

/** 从 hast 节点递归提取纯文本(渲染侧兜底用) */
export function getNodeText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as { type?: string; value?: string; children?: unknown[] }
  if (n.type === 'text' && typeof n.value === 'string') return n.value
  if (Array.isArray(n.children)) return n.children.map(getNodeText).join('')
  return ''
}

const HEADING_RE = /^(#{2,3})\s+(.+?)\s*#*\s*$/
const FENCE_RE = /^(```|~~~)/

/**
 * 从 Markdown 源码提取 h2/h3 标题(跳过代码围栏内的内容)
 */
export function extractHeadings(markdown: string): TocItem[] {
  const items: TocItem[] = []
  const slugCounts = new Map<string, number>()
  let inFence = false

  markdown.split('\n').forEach((rawLine, index) => {
    const line = rawLine.trimEnd()
    if (FENCE_RE.test(line.trim())) {
      inFence = !inFence
      return
    }
    if (inFence) return

    const match = HEADING_RE.exec(line.trim())
    if (!match) return

    const depth = match[1].length as 2 | 3
    const text = match[2].trim()
    const base = slugifyHeading(text) || 'section'
    const count = slugCounts.get(base) ?? 0
    slugCounts.set(base, count + 1)

    items.push({
      depth,
      text,
      id: count === 0 ? base : `${base}-${count}`,
      line: index + 1,
    })
  })

  return items
}

/**
 * 构建「源码行号 → 锚点 id」映射,供渲染侧(react-markdown heading 组件)
 * 通过 node.position.start.line 查得与提取侧一致的 id。
 */
export function buildHeadingIdMap(markdown: string): Map<number, string> {
  const map = new Map<number, string>()
  extractHeadings(markdown).forEach((item) => {
    map.set(item.line, item.id)
  })
  return map
}
