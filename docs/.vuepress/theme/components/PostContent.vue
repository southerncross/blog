<template>
<div class="container">
  <div class="header">
    <h1 class="title">{{post.title}}</h1>
    <div class="date-and-tags">
      <span class="date">{{getPostDateString(post.frontmatter.date)}}</span>
      <span v-if="post.frontmatter.tags" class="tags">
        <span v-for="tag of post.frontmatter.tags.split(' ')" class="tag">{{tag}}</span>
      </span>
    </div>
  </div>
  {{post}}
  <ul v-if="post.headers" class="sidebar">
    <li class="sidebar-item" v-for="header of post.headers.filter((x) => x.level === 2)">
      <a :href="getNavLink(post.path, header.title)">{{header.title}}</a>
    </li>
  </ul>
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
    getNavLink(path, title) {
      return `${path}#${title.toLowerCase().replace(/ /g, '-')}`;
    }
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

.date-and-tags
  position relative
  color color-quote-text

.date
  color color-quote-text

.tags
  position absolute
  right 0

.tag
  display inline-block
  margin-right 0.5em
  color color-quote-text

.comment
  margin-top 100px

.sidebar
  position fixed
  right calc(50vw + 360px + 20px)
  top 280px
  width 300px
  padding-right 20px
  list-style none
  border-right 1px dashed color-border

.sidebar-item
  margin-top 6px
  text-align right
  line-height 1.2
  color color-main-text
  &:hover
    color color-link
</style>

<style lang="stylus">
.vssue-button-login
.vssue-button-submit-comment
  padding 0 !important
  border 0 !important
  font-weight normal !important

.vssue-header-powered-by span
  color color-quote-text !important
</style>
