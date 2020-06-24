<template>
<div class="goods-list-page">
    <navigation-bar
        :pageName="'商品列表'"
        :isShowBack="true"
        @onLeftClick="onBackClick">
    </navigation-bar>

    <div class="goods-list-page-content">
        <goods-options></goods-options>
    </div>
</div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import GoodsOptions from '@c/goods/GoodsOptions.vue'

export default {
  components: {
    NavigationBar,
    GoodsOptions
  },
  methods: {
    /**
     * 后退按钮点击事件
     */
    onBackClick: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.goods-list-page {
    width: 100%;
    height: 100%;
    background-color: $bgColor;
    display: flex;
    flex-direction: column;

    &-content {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
}
</style>
