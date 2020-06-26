<template>
<div class="container">
  <div class="header">
    <h1 class="title">{{post.title}}</h1>
    <div class="date">{{getPostDateString(post.frontmatter.date)}}</div>
  </div>
  <div class="content">
    <Content/>
  </div>
  <div class="comment">
    <Vssue/>
  </div>
</div>
</template>

<script>
import { getDateStringFromPath, getPostDateString } from '../util.js';

export default {
  name: 'PostContent',
  props: {
    post: Object,
  },
  methods: {
    getDateStringFromPath,
    getPostDateString,
  }
}
</script>

<style lang="stylus">
@import '../variables.styl'
.content
  a:hover
    color color-link

  img
    max-width 100%
    padding 10px
    border-radius 8px
    box-shadow 0px 2px 4px 0px rgba(0,0,0,0.15)

  p code
    padding 0 4px
    word-break break-all
    background-color color-code-bg
    border-radius 4px
</style>

<style scoped lang="stylus">
@import '../variables.styl'

.header
  position relative
  padding 1rem 0 2rem 0

.title
  font-size 2rem

.date
  color color-quote-text

.comment
  margin-top 100px
</style>

<style lang="stylus">
.vssue-button-login
.vssue-button-submit-comment
  padding 0 !important
  border 0 !important
  font-weight normal !important

.vssue-header-powered-by span
  color #9a9fac !important
</style>
