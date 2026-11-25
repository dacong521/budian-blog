<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { posts } from '../../data/posts'

/**
 * 文章卡片列表（全局组件，md 里直接写标签即可）
 *
 * 用法示例：
 *   <LatestPosts />                            首页：标题栏 + 最新 6 篇
 *   <LatestPosts :limit="99" :head="false" />  全部文章页：不要标题栏，全部显示
 *   <LatestPosts category="技术笔记" :head="false" :limit="99" />  栏目页：按分类筛选
 *
 * 可传参数：
 *   limit     最多显示几篇，默认 6
 *   head      是否显示「最新文章 / 查看更多」这一行，默认 true
 *   category  只显示某个分类（技术笔记 / 生活随笔 / 资源收藏），默认不过滤
 *   title     标题栏文案，默认「最新文章」
 */
const props = withDefaults(
  defineProps<{
    limit?: number
    head?: boolean
    category?: string
    title?: string
  }>(),
  { limit: 6, head: true, category: '', title: '最新文章' }
)

const items = computed(() => {
  const list = props.category ? posts.filter((p) => p.category === props.category) : posts
  return list.slice(0, props.limit)
})

// 站内链接统一交给 withBase 处理，换成别的访问路径也不用改代码
function hrefOf(link: string, external?: boolean) {
  return external ? link : withBase(link)
}
</script>

<template>
  <section class="post-list">
    <header v-if="head" class="post-list-head">
      <h2 class="post-list-title">{{ title }}</h2>
      <a class="post-list-more" href="/posts/">全部文章 →</a>
    </header>

    <div class="post-grid">
      <a
        v-for="p in items"
        :key="p.link"
        class="post-card"
        :href="hrefOf(p.link, p.external)"
        :target="p.external ? '_blank' : undefined"
        :rel="p.external ? 'noopener noreferrer' : undefined"
      >
        <span class="post-card-cat">{{ p.category }}</span>
        <h3 class="post-card-title">{{ p.title }}</h3>
        <p class="post-card-sum">{{ p.summary }}</p>
        <div class="post-card-foot">
          <span>{{ p.date }}</span>
          <span class="post-card-arrow">{{ p.external ? '打开链接 ↗' : '阅读全文 →' }}</span>
        </div>
      </a>
    </div>

    <p v-if="!items.length" class="post-empty">这个栏目还没有文章，去 posts.ts 里加一条就有了。</p>
  </section>
</template>

<style scoped>
.post-list {
  width: 100%;
  max-width: var(--site-content-w);
  margin: 44px auto 0;
}

.post-list-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-list-title {
  margin: 0;
  font-size: 21px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.post-list-more {
  font-size: 14px;
  color: var(--site-brand);
  text-decoration: none;
  white-space: nowrap;
}

.post-list-more:hover {
  text-decoration: underline;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.post-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 20px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.post-card:hover {
  border-color: var(--site-brand);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
  transform: translateY(-2px);
}

.post-card-cat {
  align-self: flex-start;
  padding: 2px 9px;
  border: 1px solid var(--site-brand-border);
  border-radius: 3px;
  background-color: var(--site-brand-soft);
  font-size: 12px;
  line-height: 18px;
  color: var(--site-brand);
}

.post-card-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.55;
  color: var(--vp-c-text-1);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
}

.post-card:hover .post-card-title {
  color: var(--site-brand);
}

.post-card-sum {
  flex: 1;
  margin: 0;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.post-card-arrow {
  color: var(--site-brand);
}

.post-empty {
  padding: 24px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

/* 手机上单列，卡片间距收窄 */
@media (max-width: 640px) {
  .post-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .post-card {
    padding: 16px 16px 12px;
  }

  .post-card-title {
    font-size: 16px;
  }
}
</style>
