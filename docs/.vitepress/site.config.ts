import type { DefaultTheme } from 'vitepress'

/**
 * ============================================================
 * 站点基础信息（改站名、LOGO、导航、页脚都改这里）
 * 修改后保存，开发服务器会自动刷新
 * ============================================================
 */
export const site = {
  // 站名：显示在导航栏 LOGO 右侧，也是浏览器标签页标题的后缀
  name: '布点的布吉岛',

  // 站点描述：给搜索引擎看的一句话介绍，也会用在首页/分享卡片上
  description: '布点的布吉岛 —— 记录技术笔记、生活随笔和资源收藏的个人博客',

  // 导航栏图标：文件放在 docs/public/ 下，这里写以 / 开头的路径；不想要图标就改成 ''
  logo: '/logo.svg',

  /**
   * 导航栏菜单
   * - 想增删菜单：直接改这个数组，顺序就是显示顺序
   * - 想做下拉菜单：写成 { text, items: [...] }，注意这种项不要再写 link，否则下拉会被忽略
   */
  nav: [
    { text: '首页', link: '/' },
    { text: '技术笔记', link: '/notes/', activeMatch: '/notes' },
    { text: '生活随笔', link: '/life/', activeMatch: '/life' },
    { text: '资源收藏', link: '/resources/', activeMatch: '/resources' },
    { text: '关于', link: '/about', activeMatch: '/about' }
  ] as DefaultTheme.NavItem[],

  // 底部页脚：左侧版权文案，右侧可以加备案号之类的链接
  footer: {
    message: '内容随缘更新，欢迎常来',
    copyright: 'Copyright © 2026 布点的布吉岛'
  },

  // 社交图标（显示在导航栏最右侧）：不想要就整个删掉
  socialLinks: [{ icon: 'github', link: 'https://github.com/dacong521' }] as DefaultTheme.SocialLink[]
}
