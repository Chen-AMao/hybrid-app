<template>
<div class="tool-bar">
    <!-- tab按钮，需要有一个数据源，通过这个数据源去驱动视图 -->
    <div class="tool-bar-item" @click="onChangeFragment(item, index)"
     v-for="(item, index) in toolBarData" :key="index">
        <img class="tool-bar-item-img" :src="[index === selectItemIndex ? item.hIcon : item.nIcon]">
        <p class="tool-bar-item-name" :class="{'tool-bar-item-name-h': index === selectItemIndex}">{{item.name}}</p>
    </div>
</div>
</template>

<script>
/**
 * ToolBar的功能：
 * 1、永远位于页面的最底部
 * 2、点击toolbar按钮的时候，页面发生对应的切换
 * 3、按钮分为 默认 和 选中 两种状态
 * ------------------------------------------
 * 能力和约束
 * 1、不具备的能力（约束）
 * 2、通过一个回调，告诉父组件按钮的点击时间
 * 3、当按钮被选中的时候，应该切换按钮的状态
 */
export default {
  data: function () {
    return {
      toolBarData: [
        // tab按钮数据源
        {
          // 默认状态下的图片
          nIcon: require('@imgs/home-n.svg'),
          // 高亮状态下的图片
          hIcon: require('@imgs/home-h.svg'),
          // 名称
          name: '首页',
          // 组件名称
          componentName: 'home'
        },
        {
          // 默认状态下的图片
          nIcon: require('@imgs/shopping-n.svg'),
          // 高亮状态下的图片
          hIcon: require('@imgs/shopping-h.svg'),
          // 名称
          name: '购物车',
          // 组件名称
          componentName: 'shopping'
        },
        {
          // 默认状态下的图片
          nIcon: require('@imgs/my-n.svg'),
          // 高亮状态下的图片
          hIcon: require('@imgs/my-h.svg'),
          // 名称
          name: '我的',
          // 组件名称
          componentName: 'my'
        }
      ],
      selectItemIndex: 0
    }
  },
  methods: {
    onChangeFragment: function (item, index) {
      this.selectItemIndex = index
      this.$emit('onChangeFragment', item.componentName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.tool-bar{
    width: 100%;
    height: px2rem(46);
    display: flex;
    justify-content: space-around;
    background-color: white;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
    border-top: 1px solid $lineColor;

    &-item {
        text-align: center;
        padding: px2rem(4) px2rem(12);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &-img {
            width: px2rem(22);
            height: px2rem(22);
        }

        &-name {
            font-size: $infoSize;
            margin-top: px2rem(4);

            &-h {
                color: $mainColor;
            }
        }
    }
}
</style>
