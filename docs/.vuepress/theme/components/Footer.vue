<template>
<div class="container">
  Designed by <a href="/about">Lishunyang</a> | <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备20009157号</a> | All right reserved
</div>
</template>

<style scoped lang="stylus">
@import '../styles/variables.styl'

.container
  display flex
  justify-content center
  align-items center
  height 64px
  font-size 12px
  color color-copyright

a
  padding 0 4px
  font-size 12px
  &:hover
    color color-link
</style>