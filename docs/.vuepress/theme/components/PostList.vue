<template>
<div class="post-list__container">
  <ul class="post-list__list">
    <li class="post-list__item" v-for="post in orderedPosts">
      <a :href="post.path">
        <div class="post-list__title">{{post.title}}</div>
        <div class="post-list__date">{{getDateStringFromPath(post.path)}}</div>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
import { getDateStringFromPath } from '../util.js';

export default {
  name: 'PostList',
  props: {
    posts: Array,
  },
  computed: {
    orderedPosts() {
      return [...this.posts].sort((a, b) => {
        // 按时间顺序倒叙排列
        if (a.frontmatter.date && b.frontmatter.date) {
          return b.frontmatter.date.localeCompare(a.frontmatter.date)
        } else {
          return b.path.localeCompare(a.path);
        }
      });
    }
  },
  methods: {
    getDateStringFromPath,
  }
}
</script>

<style scoped lang="stylus">
@import '../variables.styl'
.post-list__list
  padding 0
  list-style none

.post-list__item
  color color-main-text

  & a
    position relative
    display block
    padding 1rem
    color color-main-text
    text-decoration none
    border-bottom 1px solid
    border-bottom-color color-border
    transition color .5s, border-bottom-color .5s
    &:hover
      color color-main-text-hover
      border-bottom-color color-main-text-hover

.post-list__title
  font-size 1.3rem

.post-list__date
  position absolute
  top 1.2rem
  right 1rem

</style>