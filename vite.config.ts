import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { execSync } from 'node:child_process'
import { readdirSync } from 'node:fs'

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
export default defineConfig({
  // GitHub Pages 部署在 /easy-web/ 子路径;本地预览保持根路径
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), postRevisionsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
})
