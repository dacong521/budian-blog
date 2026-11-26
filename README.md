# 布点的布吉岛

一个用 VitePress 搭的个人博客：深色固定导航，首页文章卡片，技术笔记 / 生活随笔 / 资源收藏三个栏目，电脑和手机都做了适配。

## 快速开始

```bash
npm install     # 首次安装依赖
npm run dev     # 本地预览：http://localhost:5173
npm run build   # 构建静态文件到 docs/.vitepress/dist
npm run preview # 预览构建结果
```

需要 Node 18 以上（当前用 Node 22 验证过）。

## 目录结构

```text
.
├─ vercel.json                 Vercel 构建配置（构建命令 + 输出目录）
├─ docs/
│  ├─ index.md                 首页（hero + 三张栏目卡 + 最新文章）
│  ├─ about.md                 关于页
│  ├─ posts/index.md           全部文章列表页
│  ├─ notes/index.md           技术笔记栏目页
│  ├─ life/index.md            生活随笔栏目页
│  ├─ resources/index.md       资源收藏栏目页
│  ├─ posts/                   文章正文（一篇一个 md）
│  ├─ life/                    随笔正文
│  ├─ resources/               收藏正文
│  ├─ public/logo.svg          站点图标
│  └─ .vitepress/
│     ├─ config.mts            站点级开关（语言、搜索、目录、边栏）
│     ├─ site.config.ts        站名 / LOGO / 导航 / 页脚 ← 最常改
│     ├─ data/posts.data.ts    文章索引（自动扫描 docs 下的 md，不用手动登记）
│     └─ theme/
│        ├─ index.ts           主题入口（注册组件）
│        ├─ Layout.vue         滚动收缩导航 + 文章元信息插槽
│        ├─ components/LatestPosts.vue  文章卡片列表组件
│        ├─ components/PostMeta.vue     文章顶部的日期/分类/标签
│        └─ custom.css         配色、导航、正文排版、移动端适配
```

## 改站名 / LOGO / 导航 / 页脚

全部在 `docs/.vitepress/site.config.ts`：

```ts
name: '布点的布吉岛',        // 站名：导航栏文字 + 浏览器标题后缀
description: '……',          // 站点描述，给搜索引擎看
logo: '/logo.svg',          // 图标：替换 docs/public/logo.svg 即可，或改这里的路径
nav: [...],                 // 导航菜单数组，增删改都在这
footer: { message, copyright }
socialLinks: [{ icon: 'github', link: '...' }]
```

导航项写法：

```ts
{ text: '技术笔记', link: '/notes/', activeMatch: '/notes' }   // 普通链接
{ text: '更多', items: [{ text: '关于', link: '/about' }] }      // 下拉菜单（这种项不要再写 link）
```

## 写一篇新文章（两步）

**第 1 步**：在对应目录新建 md。技术类放 `docs/posts/`，随笔放 `docs/life/`，收藏放 `docs/resources/`。

**第 2 步**：开头写 frontmatter（这一段不会被当成正文显示）：

```markdown
---
title: 文章标题
date: 2026-11-25
category: 技术笔记        # 只能是 技术笔记 / 生活随笔 / 资源收藏
tags: [VitePress, 建站]    # 可省略
summary: 列表卡片上显示的一句话摘要。
---
```

保存后首页、全部文章页、对应栏目页都会自动出现这篇 —— 文章索引是构建时自动扫描出来的，不用再改任何 TS 文件。

规则只有两条：

> - `date` 必须写（没有 `date` 的页面——首页、关于、各栏目首页——不会被当成文章）；
> - 分类名必须和栏目页里的 `category` 参数一字不差，否则筛不出来。

排序也自动：按 `date` 从新到旧，新文章永远在最前面。想置顶某篇，把它的 `date` 写成未来日期即可。

## 首页怎么改

`docs/index.md` 顶部 frontmatter：

- `hero.name` / `hero.text` / `hero.tagline`：大标题那几行
- `hero.actions`：两个按钮的文字和跳转
- `features`：三张栏目卡片（title 标题、details 描述、link 跳转）

正文里 `<LatestPosts :limit="6" />` 就是最新文章区，`## 这个博客` 往下是自定义文案。

## 栏目页怎么改

`docs/notes/index.md`（技术笔记）、`docs/life/index.md`、`docs/resources/index.md` 结构一样：

```markdown
# 技术笔记

栏目介绍文字……

<LatestPosts category="技术笔记" :head="false" :limit="99" />
```

改 `category` 就能换筛的分类，改上面那段话就是栏目简介。

## 文章卡片组件的参数

`LatestPosts` 可以在任何 md 里用：

| 参数 | 作用 | 默认 |
| --- | --- | --- |
| `limit` | 最多显示几篇 | `6` |
| `head` | 是否显示「最新文章 / 全部文章 →」标题栏 | `true` |
| `category` | 只显示某个分类 | 不过滤 |
| `title` | 标题栏文案 | `最新文章` |

## 换配色 / 调尺寸

`docs/.vitepress/theme/custom.css` 最上面一组变量：

| 变量 | 作用 | 默认 |
| --- | --- | --- |
| `--site-brand` | 主色（链接、按钮、选中下划线） | `#209e80` |
| `--site-brand-soft` | 主色浅底（分类标签背景） | `rgba(32,158,128,.1)` |
| `--site-content-w` | 内容区最大宽度 | `1180px` |
| `--nav-bg` | 导航背景 | `rgba(12,16,15,.92)` |
| `--nav-h` | 导航高度 | `68px` |
| `--nav-h-shrink` | 滚动后导航高度 | `56px` |
| `--site-logo-h` | LOGO 高度 | `34px` |
| `--site-logo-h-shrink` | 滚动后 LOGO 高度 | `28px` |

移动端断点在 `767px`，导航高度、LOGO、字号都在文件末尾的媒体查询里再调了一次。

## 部署到 Vercel

1. 源码推到 GitHub；
2. Vercel → `Add New Project` → 选中仓库；
3. 构建命令 `npm run build`，输出目录 `docs/.vitepress/dist`（`vercel.json` 里已经写好，通常会自动识别）；
4. 之后每次 `git push` 自动重新部署。

如果仓库是私有的，要在 Vercel 的 GitHub 授权里把这个仓库加进可访问范围。

## 常见问题

- **端口被占用**：`npm run dev -- --port 5199` 换一个；
- **页面 404**：检查 md 文件名和访问路径是否一致（路径不带 `.md`）；
- **卡片不显示**：确认 `category` 拼写一致、`date` 是 `YYYY-MM-DD` 格式；
- **导航下拉不生效**：带 `items` 的导航项不要再写 `link`。
