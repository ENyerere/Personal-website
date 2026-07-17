# Product

## Register

brand

## Users

中文读者，对前端开发、技术笔记、个人随笔感兴趣。他们通常在桌面端或移动端长时间停留阅读文章，期待安静的阅读环境，不希望被装饰元素干扰。读者可能是同行开发者、学生或技术爱好者，重视作者的独立声音而非通用教程站。

## Product Purpose

这是一个个人博客，用于发布技术笔记、项目总结与个人随笔。它提供清晰的文章归档与标签检索，展示作者身份与作品。成功标准：读者能专注阅读完整文章，并通过归档/标签自然发现更多内容；作者能以最低成本持续发布，无需维护复杂系统。

## Brand Personality

冷静清晰、编辑性、有专注感。像实验室笔记而非营销文案，像独立专栏而非通用模板。语气直接精确，留白充足，色彩克制不喧哗，让读者的注意力自然落在文字上。

3 词：calm, editorial, focused

## Anti-references

- **论坛社区**：密集信息、复杂侧边栏、楼层式排版——博客不是讨论区
- **SaaS 落地页**：满屏卡片、彩色渐变、营销话术——博客不卖东西
- **终端黑客风**：深色高对比、霓虹色、冷酷机械感——博客不是 IDE
- **活泼装饰**：满屏 emoji、表情包、过度装饰元素——装饰不应抢内容主角

## Design Principles

1. **内容为王**：设计服务于阅读，排版、色彩、动画都为让读者专注于文字而存在，不抢内容主角
2. **有作者声音**：版面与文案体现个人气质，避免通用博客模板感，像专栏而非 CMS 默认主题
3. **冷静克制**：色彩与字体传递清晰专注感，但保持留白与节制，不堆砌视觉元素
4. **动画服务于流畅**：页面过渡与元素入场动画增强阅读节奏（动画哲学参考 fuwari 项目），但每个动画都应有明确目的，不为动而动
5. **静默的可访问性**：无障碍作为基线工程实践，不作为特殊处理或额外功能宣传
6. **组件优先**：优先复用成熟组件库而非从零实现，让工程精力集中于内容与品牌表达

## Component Library Strategy

项目采用双组件库分层策略：

### 基础层：shadcn/ui
- 职责：UI 基础组件（Button、Card、Badge、NavigationMenu、Sheet、Separator 等）
- 风格：中性、克制、可访问性达标（WCAG AA、Radix 原语、键盘可达）
- 定制：通过 CSS 变量（OKLCH 色板）适配品牌色，不修改组件源码
- 适用：所有结构性 UI 元素（导航、表单、卡片容器、对话框等）

### 增强层：ReactBits
- 来源：[reactbits.dev](https://www.reactbits.dev/)（MIT + Commons Clause，110+ 动画组件）
- 职责：动画、背景、文本特效、装饰性交互组件
- 变体选择：**TS-TW**（TypeScript + Tailwind CSS，与项目技术栈一致）
- 安装方式：`npx shadcn@latest add @react-bits/<Component>-TS-TW`（通过 shadcn registry）
- 可塑性原则：组件作为素材按需取用，**不按 ReactBits 预设风格修改本项目**，而是将组件融入本博客的冷静编辑性品牌调性
- 适用范围（4 类别）：
  - **Text Animations**：文章标题入场、首屏 Hero 文字效果（适度，不喧宾夺主）
  - **Animations**：页面过渡、滚动揭示、列表入场节奏（呼应 fuwari 动画哲学）
  - **Components**：特殊交互组件（如 ScrollProgress 变体、BackToTop 动画）
  - **Backgrounds**：仅在 Hero/About 等非阅读区使用，正文区禁用动态背景
- 排除规则：
  - 不在文章正文阅读区使用任何动态背景或闪烁动画（干扰阅读）
  - 不使用与"冷静编辑性"冲突的组件（如过度霓虹、赛博朋克风格）
  - 所有引入组件必须适配明暗主题与 `prefers-reduced-motion`
- 与 shadcn/ui 关系：互补不重叠。结构性 UI 用 shadcn，动效装饰用 ReactBits；若 ReactBits 组件与 shadcn 组件功能重叠，优先 shadcn（保证可访问性）

## Accessibility & Inclusion

- WCAG AA 级合规
- 正文对比度 ≥4.5:1，大字（≥18px 或粗体 ≥14px）≥3:1
- 完整支持 `prefers-reduced-motion`，所有动画提供降级方案
- 语义化 HTML 结构、键盘可达、屏幕阅读器友好
- 不依赖颜色单独传达信息（色盲友好）

## Animation Reference

动画哲学参考 [fuwari](https://github.com/saicaca/fuwari) 项目（Astro 博客模板）。欣赏其流畅的页面过渡、滚动揭示与元素入场节奏。

## Color System Reference

色彩系统参考 [fuwari](https://github.com/saicaca/fuwari) 项目的色彩架构：

- **色彩空间**：OKLCH（感知均匀，比 HSL 更适合设计系统）
- **驱动机制**：单一 `--hue` 变量驱动整套色彩（背景、卡片、按钮、强调色等全部由同一色相派生，保证一致性）
- **色相值**：`--hue: 250`（cyan 青，与 fuwari 默认一致）
- **中性色策略**：背景与表面色用极低 chroma（0.01-0.025）的色相 tint，非纯白/纯黑，营造统一氛围
- **primary**：`oklch(0.70 0.14 250)`（亮）/ `oklch(0.75 0.14 250)`（暗），中等饱和
- **明暗双色**：同一 hue 下通过不同 Lightness 与微调 chroma 实现明暗主题
- **代码块**：明暗模式均用深色 `oklch(0.17 0.015 250)`，保证代码区专注

本博客完整采用此色彩系统架构，保持与 fuwari 一致的视觉氛围。

## Typography & Layout Reference

字体与布局参考 [fuwari](https://github.com/saicaca/fuwari) 项目：

### 字体
- **主字体**：Roboto（无衬线，400/500/700），用于正文与标题（fuwari 通过 `@fontsource/roboto` 引入）
- **代码字体**：JetBrains Mono Variable（400/500），用于代码块
- **不使用**：衬线字体作为正文（之前误用 Noto Serif SC）、装饰性标题字体（之前误用 Bricolage Grotesque）
- **标题层次**：通过 `font-bold` 字重与字号区分，而非更换字体家族

### 布局
- **三栏 Grid 布局**（桌面端）：
  - 左栏：SideBar（17.5rem 固定宽度）— Profile 卡片 + 分类 + 标签，sticky 定位
  - 中栏：主内容（自适应宽度）
  - 右栏：TOC 目录（2xl 断点显示，文章页启用），sticky 定位
- **移动端**：单栏，SideBar 移到顶部，TOC 隐藏
- **容器宽度**：`--page-width` 变量控制最大宽度
- **圆角**：`--radius-large: 1rem` 用于卡片，整体偏大圆角

### PostCard 设计
- 圆角卡片（`rounded-[var(--radius-large)]` + `card-base` 背景）
- 左侧 primary 色竖条装饰（`before:w-1 before:bg-primary`，仅桌面端显示）
- 标题 hover 变 primary 色
- 右侧箭头按钮（跳转入口）
- 元信息行：发布日期 + 标签
- 摘要 + 字数/阅读时间

### 首页结构
- MainGridLayout 包裹
- PostPage 卡片列表（卡片间 gap-4，桌面端无背景，移动端卡片容器有背景）
- 分页组件
- 入场动画：卡片依次延迟出现（`animation-delay: calc(var(--content-delay) + N * 50ms)`）
