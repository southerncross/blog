<template>
  <div class="layout__container">
    <Navbar :items="$site.themeConfig.nav"/>

    <div class="layout__main">
      <a :href="$site.base">我是谁，我在哪，请带我回家</a>
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
.layout__container
  margin-top 10vh

.layout__main
  width 90%
  max-width 720px
  min-height calc(100vh - 15rem)
  margin 0 auto
  text-align center
</style>

