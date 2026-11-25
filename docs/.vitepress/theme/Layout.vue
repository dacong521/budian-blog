<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import PostMeta from './components/PostMeta.vue'

/**
 * 布局外层：只做两件事
 * 1. 页面往下滚一点，就给 <html> 加 nav-shrink 类，导航栏变矮（样式在 custom.css）
 * 2. 文章页（frontmatter 里有 date 的页面）自动在标题下方插入发布日期 / 分类 / 标签
 */
const { frontmatter } = useData()

// 只有写了 date 的文章页才显示元信息，普通页面不受影响
const showMeta = computed(() => Boolean(frontmatter.value.date))

// 滚动监听：往下滚超过 8px 就收缩导航栏
function handleScroll() {
  document.documentElement.classList.toggle('nav-shrink', window.scrollY > 8)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <DefaultTheme.Layout>
    <!-- doc-before 是默认主题给正文顶部预留的插槽 -->
    <template #doc-before>
      <PostMeta v-if="showMeta" />
    </template>
  </DefaultTheme.Layout>
</template>
