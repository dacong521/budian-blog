---
layout: home

hero:
  name: 布点的布吉岛
  text: 记录技术与生活的小岛
  tagline: 技术笔记、生活随笔、资源收藏，想到哪儿写到哪儿
  actions:
    - theme: brand
      text: 最新文章
      link: /posts/
    - theme: alt
      text: 关于本站
      link: /about

# 首页三张栏目卡片：想改文案改 title / details，想换跳转改 link
features:
  - title: 技术笔记
    details: 建站、命令行、工具链这些动手过程，踩过的坑都记下来
    link: /notes/
  - title: 生活随笔
    details: 和技术无关的那些念头，随手记，不追求完整
    link: /life/
  - title: 资源收藏
    details: 好用的站点、工具和文档，攒成一页方便自己翻
    link: /resources/
---

<!-- 首页正文：最新 6 篇文章。想显示更多就把 :limit 改大，想去掉标题栏加 :head="false" -->
<LatestPosts :limit="6" />

## 这个博客

一个安静的角落：不追热点，不做资讯搬运，只写自己真正折腾过、想清楚了的东西。

写累了就停，想起了再写。
