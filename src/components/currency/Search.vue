<template>
<div class="search" :style="{backgroundColor: bgColor}">
    <img class="search-icon" :src="icon">
    <span class="search-hint" :style="{color: hintColor}">大前端开发，混合京东商城系统</span>
</div>
</template>

<script>
// import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  props: {
    // 图标
    icon: {
      type: String,
      default: require('@imgs/search.svg')
    },
    // 字体颜色
    hintColor: {
      type: String,
      default: '#999999'
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: '#ffffff'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.search {
    background-color: white;
    width: 100%;
    margin: px2rem(6);
    border-radius: px2rem(22);
    display: flex;
    align-items: center;

    &-icon {
        margin-left: $marginSize;
        width: px2rem(16);
    }

    &-hint {
        margin-left: $marginSize;
        font-size: $minInfoSize;
        color: $hintColor;
    }
}
</style>
