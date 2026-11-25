---
title: 用 VitePress 搭一个安静的博客
date: 2026-11-24
category: 技术笔记
tags: [VitePress, 建站]
summary: 选它的理由、目录结构、三个常用命令，以及推到 Vercel 的完整流程。
---

# 用 VitePress 搭一个安静的博客

想找个地方写东西，要求很简单：打开快、写起来不折腾、改版式不用学新框架。试过几个之后，最后留下了 VitePress。

## 为什么是它

- 写文章就是写 Markdown，保存即生效，不用碰 HTML；
- 构建出来是一堆静态文件，扔哪都能跑，加载快；
- 默认主题已经够用，想改导航和配色就动 CSS 变量，不用从头画。

对于「一个人写、偶尔更新」的博客，这三点就够了。

## 目录长什么样

```text
docs/
├─ index.md             首页
├─ about.md             关于
├─ posts/               文章目录
│  ├─ index.md          全部文章列表
│  └─ vitepress-blog.md 一篇文章
└─ .vitepress/
   ├─ config.mts        站点配置
   ├─ site.config.ts    站名 / 导航 / 页脚
   ├─ data/posts.ts     文章索引数据
   └─ theme/            导航样式和自定义组件
```

## 三个命令

```bash
npm run dev      # 本地预览，改文件自动刷新
npm run build    # 生成静态文件到 docs/.vitepress/dist
npm run preview  # 预览构建结果
```

## 发布到 Vercel

1. 源码推到 GitHub；
2. Vercel 里 `Add New Project`，选中这个仓库；
3. 构建命令 `npm run build`，输出目录 `docs/.vitepress/dist`；
4. 之后每次 push，Vercel 自动重新构建。

站点配置里已经放了 `vercel.json`，第 3 步一般会自动识别，不用手填。

## 写一篇新文章的流程

1. 在 `docs/posts/` 下新建 `xxx.md`，写好开头那几行元信息；
2. 到 `docs/.vitepress/data/posts.ts` 里加一条索引；
3. 保存，列表页和首页都会自动多出这一篇。

就这么多。
