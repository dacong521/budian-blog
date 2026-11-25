/**
 * ============================================================
 * 文章索引数据
 * 首页「最新文章」、/posts/ 全部文章页、以及各栏目页的文章列表
 * 都从这里的 posts 数组读取
 *
 * 【新增一篇文章的步骤】
 * 1. 在 docs/posts/ 下新建 xxx.md，写好 frontmatter（title / date / category / tags / summary）
 * 2. 在这个数组最前面加一条，link 写 '/posts/xxx'
 * 3. 保存即可，列表和首页会自动更新
 *
 * 【每行字段的含义】
 * title    标题（列表卡片上显示的那一行）
 * link     链接；站内文章写 /posts/xxx，外部链接写完整的 https 地址
 * category 分类，必须是「技术笔记 / 生活随笔 / 资源收藏」之一，栏目页靠它筛选
 * date     发布日期，格式 YYYY-MM-DD，列表按数组顺序展示（新的放前面）
 * summary  卡片上的一句话摘要，自己写，30~50 字比较合适
 * tags     标签（可选），用于归档和检索
 * external 是否外部链接（可选），true 表示点击后在新窗口打开
 * ============================================================
 */
export interface Post {
  title: string
  link: string
  category: '技术笔记' | '生活随笔' | '资源收藏'
  date: string
  summary: string
  tags?: string[]
  external?: boolean
}

export const posts: Post[] = [
  {
    title: '用 VitePress 搭一个安静的博客',
    link: '/posts/vitepress-blog',
    category: '技术笔记',
    date: '2026-11-24',
    summary: '选 VitePress 的理由、目录怎么长、一条命令本地预览，以及推到 Vercel 的完整流程。',
    tags: ['VitePress', '建站']
  },
  {
    title: 'Markdown 常用语法速查',
    link: '/posts/markdown-cheatsheet',
    category: '技术笔记',
    date: '2026-11-20',
    summary: '写文章时最常用的十几种写法：标题、列表、表格、代码块、提示框和链接。',
    tags: ['Markdown', '写作']
  },
  {
    title: 'Git 日常命令清单',
    link: '/posts/git-commands',
    category: '技术笔记',
    date: '2026-11-16',
    summary: '从初始化到推送、改错、回退，一次写博客真正会用到的那些命令。',
    tags: ['Git', '命令行']
  },
  {
    title: '先开个博客，再想写什么',
    link: '/life/start-here',
    category: '生活随笔',
    date: '2026-11-12',
    summary: '一直等「准备好再开始」，往往是永远不开始。先把空壳搭出来，内容慢慢填。',
    tags: ['随笔']
  },
  {
    title: '常用在线工具清单',
    link: '/resources/online-tools',
    category: '资源收藏',
    date: '2026-11-08',
    summary: '写代码、做图、查资料时会用到的几个站点，都是打开就能用的那种。',
    tags: ['工具', '收藏']
  }
]
