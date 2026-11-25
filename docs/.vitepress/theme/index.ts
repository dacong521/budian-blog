import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import LatestPosts from './components/LatestPosts.vue'
import PostMeta from './components/PostMeta.vue'
import './custom.css'

/**
 * 主题入口：在默认主题基础上替换 Layout、注册自定义组件
 * md 里可以直接用 <LatestPosts /> 和 <PostMeta />，不用 import
 */
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('LatestPosts', LatestPosts)
    app.component('PostMeta', PostMeta)
  }
} satisfies Theme
