<template>
  <div class="container">
    <Navbar :items="$site.themeConfig.nav"/>

    <div class="main">
      <a class="link" :href="$site.base">我是谁，我在哪，请带我回家</a>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import PostList from './components/PostList.vue';
import PostContent from './components/PostContent.vue';

import './common.styl'
import './normalize.css';

export default {
  components: {
    Navbar,
    Footer,
    PostList,
    PostContent,
  }
}
</script>

<style scoped lang="stylus">
@import './variables.styl'

.main
  display flex
  justify-content center
  align-items center
  width 90%
  max-width 720px
  min-height calc(100vh - 128px)
  padding-top 1em
  margin 64px auto 0 auto

.link:hover
  color color-link
</style>

