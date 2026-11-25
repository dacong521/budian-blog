import { defineConfig } from 'vitepress'
import { site } from './site.config'

/**
 * ============================================================
 * VitePress 主配置
 * 平时只改 site.config.ts 就够；这里放的是站点级开关
 * ============================================================
 */
export default defineConfig({
  // 页面语言：影响中文标点、搜索分词
  lang: 'zh-CN',

  // 站点标题 / 描述，统一从 site.config.ts 取
  title: site.name,
  description: site.description,

  // 干净的 URL：/posts/hello 而不是 /posts/hello.html
  cleanUrls: true,

  // 不在每页底部显示「最后更新时间」（想显示就改成 true）
  lastUpdated: false,

  // 关闭明暗主题切换按钮：本站导航固定深色，只做一套浅色正文
  appearance: false,

  // 浏览器标签页图标
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],

  themeConfig: {
    // 导航栏图标 + 站名
    logo: site.logo,
    siteTitle: site.name,

    // 导航菜单（数组内容在 site.config.ts 里维护）
    nav: site.nav,

    // 右侧社交图标
    socialLinks: site.socialLinks,

    // 页脚
    footer: site.footer,

    // 关闭左侧边栏：博客文章页用大栏阅读更舒服
    sidebar: false,

    // 文章右侧的「本页目录」，默认展开到三级标题
    outline: { level: [2, 3], label: '本页目录' },

    // 上一篇 / 下一篇的文案
    docFooter: { prev: '上一篇', next: '下一篇' },

    // 本地搜索（不需要联网、不需要账号），文案是中文
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文章', buttonAriaLabel: '搜索文章' },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清空关键词',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  }
})
