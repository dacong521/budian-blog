---
title: Markdown 常用语法速查
date: 2026-11-20
category: 技术笔记
tags: [Markdown, 写作]
summary: 写文章时最常用的十几种写法：标题、列表、表格、代码块、提示框和链接。
---

# Markdown 常用语法速查

写博客九成时间就用到下面这些，记不住的时候翻一下。

## 标题与段落

```markdown
# 一级标题（文章标题，一篇文章只写一个）
## 二级标题（会自动进入右侧目录）
### 三级标题

空一行表示新段落，段内换行不会断行。
```

## 强调

```markdown
**加粗**  *斜体*  `行内代码`  ~~删除线~~
```

## 列表

```markdown
- 无序
- 列表

1. 有序
2. 列表
```

## 表格

```markdown
| 项目 | 说明 |
| --- | --- |
| 构建 | npm run build |
| 输出 | docs/.vitepress/dist |
```

## 代码块

在三个反引号后面写语言名，会自动高亮：

` ```bash ` → 显示成带配色的命令块。

## 提示框

VitePress 支持带颜色的小提示块：

```markdown
::: tip 小提示
这里写补充说明
:::
```

可用的类型还有 `info`、`warning`、`danger`，写错了不会报错，只是样式不同。

## 链接与图片

```markdown
[站内文章](/posts/vitepress-blog)
[外站链接](https://vitepress.dev)

![图片描述](/logo.svg)
```

图片建议放在 `docs/public/` 下，引用时写 `/文件名`。

## 文章开头那几行

每篇文章开头 `---` 包起来的部分叫 frontmatter，列表页靠它取标题、日期和摘要：

```markdown
---
title: 文章标题
date: 2026-11-20
category: 技术笔记
tags: [Markdown, 写作]
summary: 列表卡片上显示的一句话摘要。
---
```

改完保存就能看到效果。
