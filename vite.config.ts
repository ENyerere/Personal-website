import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { execSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { parseFrontMatter } from './src/lib/frontMatter'

/**
 * F4 版本历史:构建期为每篇文章取 git 短 hash 与修订次数,
 * 经虚拟模块 virtual:post-revisions 注入前端。
 * 降级策略:git 或远端不可用 → repoUrl 为 null(页面不显示 rev 行);
 * 文件未提交 → 该文无记录(页面显示 draft)。
 */
const VIRTUAL_ID = 'virtual:post-revisions'
const RESOLVED_ID = '\0' + VIRTUAL_ID

function git(args: string): string {
  return execSync(`git ${args}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
}

/** https://github.com/o/r.git 或 git@github.com:o/r.git → https://github.com/o/r */
function normalizeRepoUrl(remote: string): string | null {
  if (/^https?:\/\/.+/.test(remote)) return remote.replace(/\.git$/, '')
  const ssh = /^git@([^:]+):(.+)$/.exec(remote)
  if (ssh) return `https://${ssh[1]}/${ssh[2].replace(/\.git$/, '')}`
  return null
}

function postRevisionsPlugin(): Plugin {
  return {
    name: 'post-revisions',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return null

      let repoUrl: string | null = null
      let branch = 'main'
      const revisions: Record<string, { hash: string; count: number }> = {}

      try {
        repoUrl = normalizeRepoUrl(git('config --get remote.origin.url'))
        branch = git('rev-parse --abbrev-ref HEAD') || 'main'
        const postsDir = path.resolve(__dirname, 'src/content/posts')
        for (const file of readdirSync(postsDir)) {
          if (!file.endsWith('.md')) continue
          const rel = `src/content/posts/${file}`
          try {
            const hash = git(`log -1 --format=%h -- "${rel}"`)
            if (!hash) continue // 未提交:无版本记录
            const count = Number(git(`rev-list --count HEAD -- "${rel}"`)) || 1
            revisions[file.replace(/\.md$/, '')] = { hash, count }
          } catch {
            // 单文件查询失败不影响整体
          }
        }
      } catch {
        repoUrl = null
      }

      return `export default ${JSON.stringify({ repoUrl, branch, revisions })}`
    },
  }
}

// https://vitejs.dev/config/
/**
 * P0-2 RSS 订阅:构建期从 src/content/posts/*.md 生成 RSS 2.0 feed。
 * 经 emitFile 写入 dist/feed.xml;SITE_URL 可用环境变量覆盖(本地构建默认 Pages 地址)。
 */
const SITE_URL = (process.env.SITE_URL ?? 'https://enyerere.github.io/Personal-website').replace(/\/$/, '')
const SITE_TITLE = '姚沈峄'
const SITE_DESC = '手稿档案 · 个人博客'

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rssFeedPlugin(): Plugin {
  return {
    name: 'rss-feed',
    generateBundle() {
      const postsDir = path.resolve(__dirname, 'src/content/posts')
      const items = readdirSync(postsDir)
        .filter((f) => f.endsWith('.md'))
        .map((f) => {
          const { data } = parseFrontMatter(readFileSync(path.join(postsDir, f), 'utf-8'))
          return {
            slug: String(data.slug || f.replace(/\.md$/, '')),
            title: String(data.title || ''),
            excerpt: String(data.excerpt || ''),
            tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
            date: new Date(String(data.createdAt || '')),
            published: data.published !== false,
          }
        })
        .filter((p) => p.published && p.title && !Number.isNaN(p.date.getTime()))
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 20)

      const itemXml = items
        .map((p) => {
          const link = `${SITE_URL}/posts/${p.slug}`
          const cats = p.tags.map((t) => `      <category>${xmlEscape(t)}</category>`).join('\n')
          return `    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${p.date.toUTCString()}</pubDate>
      <description>${xmlEscape(p.excerpt)}</description>${cats ? `\n${cats}` : ''}
    </item>`
        })
        .join('\n')

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE_TITLE)}</title>
    <link>${SITE_URL}/</link>
    <description>${xmlEscape(SITE_DESC)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${itemXml}
  </channel>
</rss>
`
      this.emitFile({ type: 'asset', fileName: 'feed.xml', source: xml })
    },
  }
}

export default defineConfig({
  // GitHub Pages 部署在 /Personal-website/ 子路径;本地预览保持根路径
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), postRevisionsPlugin(), rssFeedPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
})
