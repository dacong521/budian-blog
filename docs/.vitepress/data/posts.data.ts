/**
 * ============================================================
 * 文章索引（自动扫描版）
 * 首页「最新文章」、/posts/ 全部文章页、各栏目页的卡片列表
 * 都从这里读取，但这里不需要你手动维护：构建时自动扫 docs 下所有 md
 *
 * 【新增一篇文章只需要】
 * 1. 在 docs/posts/、docs/life/、docs/resources/ 下任意新建 xxx.md
 * 2. frontmatter 里写好 title / date / category / tags / summary
 * 3. 保存 —— 首页、全部文章页、对应栏目页自动出现，不用再改这个文件
 *
 * 【frontmatter 字段作用】
 * title     卡片标题（不写就取文件名）
 * date      发布日期，格式 YYYY-MM-DD；没有 date 的页面（首页、关于等）不会被当成文章，自动排除
 * category  分类，写「技术笔记 / 生活随笔 / 资源收藏」，栏目页靠它筛选
 * summary   卡片上的一句话摘要（不写就留空，不影响显示）
 * tags      标签，可省略
 * external  可选，true 表示这篇是外部链接，配合 link 使用
 * link      可选，用于外部链接；站内文章不用写，自动用文件路径
 *
 * 排序规则：按 date 从新到旧，同一天按文件名
 * ============================================================
 */
import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  link: string
  category: string
  date: string
  summary: string
  tags?: string[]
  external?: boolean
}

declare const data: Post[]
export { data }

// 把 frontmatter 里的 date（可能是日期对象，也可能是字符串）统一成 YYYY-MM-DD
function formatDate(value: unknown): string {
  if (!value) return ''
  const d = value instanceof Date ? value : new Date(String(value))
  if (Number.isNaN(d.getTime())) return String(value)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function normalizeTags(value: unknown): string[] | undefined {
  if (!value) return undefined
  return Array.isArray(value) ? value.map(String) : [String(value)]
}

export default createContentLoader('**/*.md', {
  // 不读取正文，只取路径和 frontmatter，构建更快
  includeSrc: false,
  transform(raw): Post[] {
    return raw
      // 只把写了 date 的页面当文章：首页、关于、各栏目首页都没有 date，自动跳过
      .filter((page) => Boolean(page.frontmatter?.date))
      .map((page) => ({
        title: String(page.frontmatter.title ?? page.url),
        // cleanUrls 模式下 url 可能带 .html，这里统一去掉
        link: String(page.frontmatter.link ?? page.url).replace(/\.html$/, ''),
        category: String(page.frontmatter.category ?? ''),
        date: formatDate(page.frontmatter.date),
        summary: String(page.frontmatter.summary ?? ''),
        tags: normalizeTags(page.frontmatter.tags),
        external: Boolean(page.frontmatter.external)
      }))
      // 按日期倒序，新文章永远在最前面
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  }
})
