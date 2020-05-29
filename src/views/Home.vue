<template>
  <div class="home">
    <p class="test">测试 fontSize</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

  .test {
    font-size: px2rem(16);
  }
</style>
