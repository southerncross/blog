<template>
  <div class="layout__container">
    <Navbar :items="$site.themeConfig.nav"/>
    <PostList v-if="$page.frontmatter.home" :posts="$site.pages.filter((page) => !page.frontmatter.home)"/>
    <Content v-else/>

    <div style="border: 1px solid red;">
      <div>{{$site}}</div>
      <div>{{$page}}</div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import PostList from '../components/PostList.vue';

export default {
  components: {
    Navbar,
    PostList,
  }
}
</script>

<style scoped>
.layout__container {
  margin-top: 40px;
}
</style>

