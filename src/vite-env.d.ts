/// <reference types="vite/client" />

declare module 'virtual:post-revisions' {
  const value: {
    /** git 远端仓库 https 地址;git/远端不可用时为 null */
    repoUrl: string | null
    /** 当前分支名 */
    branch: string
    /** 以文章文件名(不含 .md)为键的版本记录;未提交的文件无记录 */
    revisions: Record<string, { hash: string; count: number }>
  }
  export default value
}
