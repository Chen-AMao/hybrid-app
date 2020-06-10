<template>
<div class="shopping">
    <navigation-bar :pageName="'购物车'" :isShowBack="false"></navigation-bar>
    <p>SHOPPING</p>
</div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  components: {
    NavigationBar
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.shopping {
    width: 100%;
    height: 100%;
    font-size: px2rem(32);
}
</style>
