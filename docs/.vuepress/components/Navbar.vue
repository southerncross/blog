<template>
  <ul class="navbar__container">
    <li class="navbar__title">Lishunyang's Blog</li>
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

<style scoped>
.navbar__container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  padding: 0 1em;
  margin: 0;
  list-style: none;
  border-bottom: 1px solid gray;
  color: gray;
}

.navbar__title {
  flex: none;
  position: absolute;
  left: 1em;
}

.navbar__item {
  flex: none;
  margin-left: 2em;
}

.navbar__item a {
  text-decoration: none;
  color: gray;
}
</style>
