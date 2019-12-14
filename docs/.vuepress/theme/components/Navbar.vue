<template>
  <ul class="navbar__container">
    <li class="navbar__title"><a :href="$site.base">Lishunyang's Blog</a></li>
    <li class="navbar__item" v-for="item in $site.themeConfig.nav">
      <a :href="item.link">{{item.text}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Navbar',

  props: {
    items: Array,
  }
};
</script>

<style scoped lang="stylus">
@import '../variables.styl'

.navbar__container
  position fixed
  z-index 3
  top 0
  left 0
  right 0
  display flex
  justify-content flex-end
  align-items center
  padding 1em
  margin 0
  list-style none
  background color-background
  border-bottom 1px solid color-border
  color color-main-text

.navbar__title
  flex none
  position absolute
  left 1em
  & a
    color color-main-text
    text-decoration none
    transition color .5s
    &:hover
      color color-main-text-hover

.navbar__item
  flex none
  margin-left 2em
  & a
    color color-main-text
    text-decoration none
    transition color .5s
    &:hover
      color color-main-text-hover
</style>
