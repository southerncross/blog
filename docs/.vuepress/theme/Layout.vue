<template>
  <div>
    <Navbar :items="$site.themeConfig.nav"/>

    <div class="main">
      <PostList v-if="$page.frontmatter.home" :posts="$site.pages.filter((page) => !page.frontmatter.home)"/>
      <PostContent v-else :post="$page"/>
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
import './prism.css';

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
.main
  width 90%
  max-width 720px
  min-height calc(100vh - 128px)
  padding-top 1em
  margin 64px auto 0 auto
</style>

