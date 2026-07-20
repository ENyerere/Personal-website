# easy-web

个人博客——技术笔记、项目总结与个人随笔。

- 技术栈:React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Zustand
- 设计文档:见 [PRODUCT.md](PRODUCT.md)(「手稿档案」风格)

## 常用命令

```bash
npm run dev      # 开发服务器
npm run build    # 类型检查 + 生产构建
npm run preview  # 预览构建产物
```

## 写作指南

文章存放在 `src/content/posts/*.md`,**写作即提交**:新增一个 `.md` 文件并提交,构建后自动上线,无需改动任何代码。

文件开头是 front matter(YAML 子集),空一行后是 Markdown 正文:

```markdown
---
title: 文章标题            # 必填
slug: my-post             # 可选,默认取文件名(不含 .md)
excerpt: 一句话摘要       # 可选,用于列表页
tags: [随笔, 个人]        # 可选,行内数组;也支持 `-` 块级列表
createdAt: 2025-03-15     # 必填,YYYY-MM-DD
updatedAt: 2025-03-20     # 可选,默认等于 createdAt
published: false          # 可选,默认 true;false 时为草稿不上线
series: 博客改造日志      # 可选,所属系列名;同系列文章自动串联并生成 /series/ 合集页
---

正文从这里开始。注意:**正文不要重复写一级标题**,
页面标题由 front matter 的 title 渲染;章节从 `##` 开始。
```

约定:

- 正文章节标题从 `##`(h2)开始,h2/h3 会自动生成锚点并进入右侧目录
- 文件名即默认 slug,建议用英文小写加连字符,如 `react-refactor-notes.md`
- 草稿(`published: false`)不会出现在任何列表与路由中
- 每次构建会自动生成 `feed.xml`(RSS 2.0,取最新 20 篇已发布文章),无需手动维护;`excerpt` 即订阅源里的摘要,建议认真填写
