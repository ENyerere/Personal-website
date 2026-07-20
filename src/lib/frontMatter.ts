/**
 * 极简 front matter 解析器(零依赖)。
 *
 * 支持的语法(刻意保持最小集,写作约定见 README):
 * ---
 * title: 文章标题          # 标量(字符串/数字/true/false)
 * tags: [随笔, 个人]       # 行内数组
 * tags:                    # 或块级数组
 *   - 随笔
 *   - 个人
 * excerpt: "含:冒号的值"  # 引号包裹
 * ---
 */

export interface FrontMatterResult {
  data: Record<string, unknown>
  body: string
}

const FRONT_MATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/
const LIST_ITEM_RE = /^\s+-\s+(.+)$/
const KEY_VALUE_RE = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/

function parseScalar(raw: string): unknown {
  const t = raw.trim()
  if (t === 'true') return true
  if (t === 'false') return false
  if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t)
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1)
  }
  if (t.startsWith('[') && t.endsWith(']')) {
    const inner = t.slice(1, -1).trim()
    if (!inner) return []
    return inner.split(',').map((item) => String(parseScalar(item)))
  }
  return t
}

function parseYamlBlock(block: string): Record<string, unknown> {
  const data: Record<string, unknown> = {}
  let currentKey: string | null = null

  block.split(/\r?\n/).forEach((line) => {
    if (!line.trim() || line.trim().startsWith('#')) return

    const listItem = LIST_ITEM_RE.exec(line)
    if (listItem && currentKey) {
      const arr = Array.isArray(data[currentKey]) ? (data[currentKey] as unknown[]) : []
      arr.push(parseScalar(listItem[1]))
      data[currentKey] = arr
      return
    }

    const kv = KEY_VALUE_RE.exec(line)
    if (kv) {
      currentKey = kv[1]
      data[currentKey] = kv[2] === '' ? '' : parseScalar(kv[2])
    }
  })

  return data
}

/** 解析 Markdown 原文:分离 front matter 与正文。无 front matter 时 data 为空对象 */
export function parseFrontMatter(raw: string): FrontMatterResult {
  const match = FRONT_MATTER_RE.exec(raw)
  if (!match) return { data: {}, body: raw }
  return { data: parseYamlBlock(match[1]), body: raw.slice(match[0].length) }
}
