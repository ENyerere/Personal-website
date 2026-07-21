/**
 * 项目策展配置:关于页「项目」区块的数据源。
 * 构建期 githubProjectsPlugin 按 repo 名拉取 GitHub 活数据(语言/star/更新时间/链接),
 * 组装为 Project[] 经 virtual:github-projects 注入;拉取失败时退化为仅配置信息。
 * 上架新项目:在 GitHub 建仓库后,往这里加一行即可。
 */
export interface ProjectConfig {
  /** GitHub 仓库名(当前账户名下) */
  repo: string
  /** 展示名,默认取仓库名 */
  title?: string
  /** 中文描述覆盖;不填则用 GitHub 仓库描述 */
  description?: string
}

export const projectConfigs: ProjectConfig[] = [
  {
    repo: 'QY-Community',
    description: '社区管理微信小程序,旨在打造一个简洁、易用的社区平台。',
  },
  {
    repo: 'molink',
    description: '轻量级页面编辑器,基于 React + Slate 富文本 + Tailwind CSS。',
  },
  {
    repo: 'PromptForge',
    description: '提示词管理仓库,集中整理、迭代与复用高质量 Prompt。',
  },
]

export interface Project {
  repo: string
  title: string
  description: string
  /** 仓库链接 */
  url: string
  /** 主语言;构建期拉取失败为 null */
  language: string | null
  /** star 数;拉取失败为 0(0 时页面不展示) */
  stars: number
  /** 最近推送时间 ISO 字符串;拉取失败为空串 */
  pushedAt: string
}
