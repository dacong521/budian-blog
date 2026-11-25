<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

/**
 * 文章元信息条：发布日期 / 分类 / 标签
 * 数据来自每篇文章 md 的 frontmatter，不用手写
 * 只有 frontmatter 里写了 date 的页面才会显示（由 Layout.vue 控制）
 */
const { frontmatter } = useData()

// date 在 frontmatter 里可以写成 2026-11-24（会自动解析成日期对象），也可以写成 "2026-11-24"，
// 这里统一格式化成「年-月-日」，避免页面上出现 2026-11-24T00:00:00.000Z 这种原始格式
const date = computed(() => {
  const raw = frontmatter.value.date
  if (!raw) return ''
  const d = raw instanceof Date ? raw : new Date(String(raw))
  if (Number.isNaN(d.getTime())) return String(raw)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
})
const category = computed(() => String(frontmatter.value.category ?? ''))
const tags = computed<string[]>(() => {
  const t = frontmatter.value.tags
  if (!t) return []
  return Array.isArray(t) ? t.map(String) : [String(t)]
})
</script>

<template>
  <div class="post-meta">
    <span class="post-meta-date">{{ date }}</span>
    <span v-if="category" class="post-meta-dot">·</span>
    <span v-if="category" class="post-meta-cat">{{ category }}</span>
    <span v-for="tag in tags" :key="tag" class="post-meta-tag">#{{ tag }}</span>
  </div>
</template>

<style scoped>
.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: -4px 0 26px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.post-meta-date {
  font-variant-numeric: tabular-nums;
}

.post-meta-cat {
  color: var(--site-brand);
}

.post-meta-tag {
  padding: 1px 8px;
  border-radius: 10px;
  background-color: var(--vp-c-default-soft);
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
