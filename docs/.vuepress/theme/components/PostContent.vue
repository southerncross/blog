<template>
<div class="post-content__container">
  <div class="post-content__header">
    <span class="post-content__title">{{post.title}}</span>
    <span class="post-content__date">{{getDateStringFromPath(post.path)}}</span>
  </div>
  <Content/>
</div>
</template>

<script>
import { getDateStringFromPath } from '../util.js';

export default {
  name: 'PostContent',
  props: {
    post: Object,
  },
  methods: {
    getDateStringFromPath,
  }
}
</script>

<style scoped lang="stylus">
@import '../variables.styl'

.post-content__header
  position relative
  padding 1rem 0 2rem 0

.post-content__title
  font-size 2rem

.post-content__date
  position absolute
  right 0
  top 1.6rem
</style>
