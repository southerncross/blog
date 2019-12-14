<template>
  <div class="layout__container">
    <Navbar :items="$site.themeConfig.nav"/>

    <div class="layout__main">
      <PostList v-if="$page.frontmatter.home" :posts="$site.pages.filter((page) => !page.frontmatter.home)"/>
      <PostContent v-else :post="$page"/>
    </div>

    <Footer/>

    <!-- <div style="border: 1px solid red;">
      <div>{{$site}}</div>
      <div>{{$page}}</div>
    </div> -->
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
</style>

