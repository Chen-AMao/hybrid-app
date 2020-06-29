<template>
<div class="goods-list-page">
    <navigation-bar
        :pageName="'商品列表'"
        :isShowBack="true"
        @onLeftClick="onBackClick">
        <template v-slot:nav-right>
          <img :src="layoutType.icon" @click="onChangeLayoutTypeClick()">
        </template>
    </navigation-bar>

    <div class="goods-list-page-content">
        <goods-options></goods-options>
        <goods :layoutType="layoutType.type"></goods>
    </div>
</div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import GoodsOptions from '@c/goods/GoodsOptions.vue'
import Goods from '@c/goods/Goods.vue'

export default {
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  },
  data: function () {
    return {
      layoutTypeDatas: [
        {
          // 垂直列表
          type: '1',
          icon: require('@imgs/list-type.svg')
        },
        {
          // 网格布局
          type: '2',
          icon: require('@imgs/grid-type.svg')
        },
        {
          // 瀑布流
          type: '3',
          icon: require('@imgs/waterfall-type.svg')
        }
      ],
      // 当前goods展示形式
      layoutType: {}
    }
  },
  created: function () {
    this.layoutType = this.layoutTypeDatas[0]
  },
  methods: {
    /**
     * 后退按钮点击事件
     */
    onBackClick: function () {
      this.$router.go(-1)
    },
    /**
     * 切换goods展示形式
     */
    onChangeLayoutTypeClick: function () {
      this.layoutType = this.layoutTypeDatas[(Number(this.layoutType.type) + 1) % 3]
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
