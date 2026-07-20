---
title: 博客上线记:写作即提交
slug: blog-relaunch-pipeline
excerpt: 博客换上了「手稿档案」的新装,并接入了 GitHub Pages 自动部署。现在写一篇 Markdown、一次 git push,就是一次发布。
tags: [博客, 部署, 写作]
createdAt: 2026-07-20
---

## 新风格:手稿档案

这次改版把原来的卡片式设计换成了单色 ink/paper 体系——全站靠 hairline 细分线、
字重和留白来组织信息,像一叠整理好的手稿。文章页的标题有逐行揭示的动效,
顶部是一块 YAML 风格的元数据,记录日期、标签和版本历史。

## 新管线:写作即提交

文章不再硬编码在代码里,而是放在 `src/content/posts/` 下的 Markdown 文件中,
由 front matter 驱动。写一篇文章的流程就是:

1. 新建一个 `.md` 文件,填好 front matter
2. `git commit` 并 `git push`
3. GitHub Actions 自动构建并发布到 Pages

构建期还会为每篇文章注入 git 短哈希和修订次数,文章页的 rev 行
可以直接链到 GitHub 的提交历史——每一次修改都有迹可循。

这篇文章本身就是这条管线的第一次端到端验证——从写作、提交到自动上线,全程无手工干预。
