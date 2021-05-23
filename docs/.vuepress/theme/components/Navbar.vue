<template>
  <ul class="container">
    <li class="title"><a :href="$site.base"><img class="avatar" src="../assets/avatar.jpg"/>Lishunyang's Blog</a></li>
    <li class="item" v-for="item in $site.themeConfig.nav">
      <a :href="item.link"><img class="github" src="../assets/github.png"/></a>
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
.container
  position fixed
  z-index 3
  top 0
  left 0
  right 0
  display flex
  justify-content flex-end
  align-items center
  height 64px
  padding 0 1em
  margin 0
  list-style none
  background $color-background
  color $color-main-text
  background rgba(255,255,255,1)
  box-shadow 0px 2px 4px 0px rgba(0,0,0,0.15)

.title
  flex none
  position absolute
  left 1em
  & a
    color $color-main-text
    text-decoration none
    transition color .5s
    &:hover
      color $color-main-text-hover

.avatar
  width 32px
  margin-right 1em
  vertical-align middle

.github
  width 20px

.item
  flex none
  margin-left 2em
  & a
    color $color-main-text
    text-decoration none
    transition color .5s
    &:hover
      color $color-main-text-hover
</style>
