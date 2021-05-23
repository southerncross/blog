<template>
<div class="container">
  <ul class="list">
    <li class="item" v-for="post in orderedPosts">
      <a :href="post.path">
        <div class="title">{{post.title}}</div>
        <div class="date">{{getDateStringFromPath(post.path)}}</div>
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
.list
  padding 0
  list-style none

.item
  color $color-main-text
  border-bottom 1px dashed $color-border

  & a
    position relative
    display block
    padding 1rem 0
    color $color-main-text
    &:hover
      color $color-main-text-hover
      border-bottom-color $color-main-text-hover

.title
  width calc(100% - 60px)
  font-size 1rem
  white-space nowrap
  text-overflow ellipsis
  overflow hidden

.date
  position absolute
  top 1.1rem
  right 0
  font-size 0.8rem
  color $color-quote-text

</style>