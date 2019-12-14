<template>
<ul>
  <li v-for="post in posts">
    <a :href="post.path">
      {{post.title}}
      {{post.lastUpdated}}
    </a>
  </li>
</ul>
</template>

<script>
export default {
  name: 'PostList',
  props: {
    posts: Array,
  }
}
</script>