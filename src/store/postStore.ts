import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialPosts } from '@/data/posts'

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string // Markdown 字符串
  tags: string[]
  createdAt: string // ISO 8601 字符串
  updatedAt: string // ISO 8601 字符串
  published: boolean
}

interface PostState {
  posts: Post[]
  // 操作（MVP 阶段暂不实现 CRUD UI，但保留接口）
  addPost: (post: Post) => void
  updatePost: (slug: string, updates: Partial<Post>) => void
  deletePost: (slug: string) => void
}

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      posts: initialPosts, // 初始加载示例文章
      addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
      updatePost: (slug, updates) =>
        set((state) => ({
          posts: state.posts.map((p) => (p.slug === slug ? { ...p, ...updates } : p)),
        })),
      deletePost: (slug) =>
        set((state) => ({ posts: state.posts.filter((p) => p.slug !== slug) })),
    }),
    {
      name: 'easy-web-posts-v2',
      version: 2,
      // MVP 阶段:initialPosts 是权威数据源。版本升级时重置本地缓存,
      // 保证老访客能看到示例文章的更新;后续接入真正的内容管线后,
      // 应改为按 slug 合并而非整体重置。
      migrate: (persistedState, version) => {
        if (version < 2) {
          return { posts: initialPosts }
        }
        return persistedState as PostState
      },
    }
  )
)

// 选择器函数（纯函数，便于在组件中调用）

// 获取已发布文章，按 createdAt 倒序
export function getPosts(posts: Post[]): Post[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// 按 slug 获取文章
export function getPostBySlug(posts: Post[], slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug && p.published)
}

// 按标签获取文章
export function getPostsByTag(posts: Post[], tag: string): Post[] {
  return getPosts(posts).filter((p) => p.tags.includes(tag))
}

// 获取所有标签（去重，按文章数倒序）
export function getAllTags(posts: Post[]): { tag: string; count: number }[] {
  const map = new Map<string, number>()
  getPosts(posts).forEach((p) => {
    p.tags.forEach((tag) => {
      map.set(tag, (map.get(tag) ?? 0) + 1)
    })
  })
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

// 按年份分组归档
export function getArchives(posts: Post[]): { year: number; posts: Post[] }[] {
  const sorted = getPosts(posts)
  const map = new Map<number, Post[]>()
  sorted.forEach((p) => {
    const year = new Date(p.createdAt).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(p)
  })
  return Array.from(map.entries())
    .map(([year, yearPosts]) => ({ year, posts: yearPosts }))
    .sort((a, b) => b.year - a.year)
}
