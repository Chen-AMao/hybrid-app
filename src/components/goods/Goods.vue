<template>
    <!--
        如何在同一个组件中展示不同的样式:
        1. html表示整个布局结构,具体样式由css决定
        2. 每种展示样式对应不同的css,也就是对应不同的类名
          垂直列表 -> goods-list
          网格布局 -> goods-grid
          瀑布流布局 -> goods-waterfall
        3. 实现不同的样式,本质上就是实现不同的css样式

        瀑布流布局
        1. 创建商品列表基本的html和css，让item相对于goods（div）进行排列
        2. 生成不同高度的图片，撑起不同高度的item
        3. 计算item的位置，来达到从上到下，从左到右依次排列的目的
    -->
<div class="goods" :class="[layoutClass, {'goods-scroll': isScroll}]" :style="{height: goodsViewHeight}">
    <div class="goods-item" :class="layoutItemClass" v-for="(item, index) in dataSource" :key="index"
         ref="goodsItem" :style="goodsItemStyles[index]">
        <!-- 图片 -->
        <img class="goods-item-img" :src="item.img" :style="imgStyles[index]">
        <!-- 描述 -->
        <div class="goods-item-desc">
            <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint': !item.isHave}">
                <!-- 是否为直营 -->
                <direct v-if="item.isDirect"></direct>
                <!-- 是否有库存 -->
                <no-have v-if="!item.isHave"></no-have>
                {{item.name}}
            </p>
            <div class="goods-item-desc-data">
                <p class="goods-item-desc-data-price">￥{{item.price | priceValue}}</p>
                <p class="goods-item-desc-data-volume">销量{{item.volume}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Direct from '@c/goods/Direct.vue'
import NoHave from '@c/goods/NoHave.vue'

export default {
  components: {
    Direct,
    NoHave
  },
  props: {
    /**
     * 在父元素中指定展示形式
     * 1. 垂直列表
     * 2. 网格布局
     * 3. 瀑布流布局
     */
    layoutType: {
      type: String,
      default: '1'
    },
    /**
     * 是否允许goods单独滑动
     */
    isScroll: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      dataSource: [],
      // 最大高度
      MAX_IMG_HEIGHT: 230,
      // 最小高度
      MIN_IMG_HEIGHT: 178,
      // 图片样式集合
      imgStyles: [],
      // item margin
      ITEM_MARGIN_SIZE: 8,
      // item样式集合
      goodsItemStyles: [],
      // goods组件高度
      goodsViewHeight: '100%',
      // 不同展示形式下的类名
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item'
    }
  },
  created: function () {
    this.initData()
  },
  methods: {
    /**
     * 获取数据
     */
    initData: function () {
      this.$http.get('./goods')
        .then(data => {
          console.log('goods', data.list)
          this.dataSource = data.list
          // 设置布局
          this.initLayout()
        })
    },
    /**
     * 返回随机的图片高度
     */
    imgHeight: function () {
      // Math.random() 返回0-1的随机数
      const result = Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT
      return Math.floor(result)
    },
    /**
     * 根据随机的图片高度，生成对应的图片数据
     */
    initImgStyles: function () {
      this.dataSource.forEach(item => {
        const imgHeight = this.imgHeight() + 'px'
        this.imgStyles.push({
          height: imgHeight
        })
      })
    },
    /**
     * 瀑布流布局
     * 1. 获取到所有的item元素
     * 2. 遍历item元素，得到每一个item的高度，加上一个margin的高度
     * 3. 创建两个变量：leftHeightTotal, rightHeightTotal 分别表示左右两侧目前距离顶部的高度。
     *    通过对于左右两侧距离顶部的高度，来确定item放置的位置。
     *    如果左侧<=右侧高度，那么item应该放置到左侧。此时item距离左侧为0，距离顶部为leftHeightTotal。
     *    否则item应该放置到右侧。此时item距离右侧为0，距离顶部为rightHeightTotal。
     * 4. 保存计算出的item的所有样式，配置到item上。
     * 5. item配置完成之后，左右两侧高度最大值为goods组件的高度
     */
    initWaterfall: function () {
      // 获取所有的item元素
      const $goodsItems = this.$refs.goodsItem
      console.log($goodsItems)
      if (!$goodsItems) return
      let [leftHeightTotal, rightHeightTotal] = [0, 0]
      $goodsItems.forEach(($el, index) => {
        const elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE
        let goodsItemStyle = {}
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          leftHeightTotal += elHeight
        } else {
          goodsItemStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }
          rightHeightTotal += elHeight
        }
        this.goodsItemStyles.push(goodsItemStyle)
      })
      console.log(this.goodsItemStyles)
      if (!this.isScroll) {
        this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
      }
    },
    /**
     * 设置布局
     * 1. 初始化影响到布局的数据源
     * 2. 为不同的layoutType设置不同的展示类
     */
    initLayout: function () {
      this.goodsViewHeight = '100%'
      this.goodsItemStyles = []
      this.imgStyles = []
      switch (this.layoutType) {
        // 垂直列表
        case '1':
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        case '2':
          this.layoutClass = 'goods-grid'
          this.layoutItemClass = 'goods-grid-item'
          break
        case '3':
          this.layoutClass = 'goods-waterfall'
          this.layoutItemClass = 'goods-waterfall-item'
          this.initImgStyles()
          this.$nextTick(() => {
            this.initWaterfall()
          })
          break
      }
    }
  },
  watch: {
    /**
     * 监听 layoutType
     */
    layoutType: function () {
      this.initLayout()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.goods {
    background-color: $bgColor;

    &-scroll {
      overflow: hidden;
      overflow-y: auto;
    }

    &-item {
        background-color: white;
        padding: $marginSize;
        box-sizing: border-box;

        &-desc {
            width: 100%;

            &-name {
                font-size: $infoSize;
                line-height: px2rem(18);

                &-hint {
                    color: $hintColor;
                }
            }

            &-data {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: $marginSize;

                &-price {
                    font-size: $titleSize;
                    color: $mainColor;
                    font-weight: 500;
                }

                &-volume {
                    font-size: $infoSize;
                    color: $hintColor;
                }
            }
        }
    }
}

// 垂直列表
.goods-list {
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;

    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
    }

    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}

// 网格布局
.goods-grid {
    padding: $marginSize;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &-item {
        width: 49%;
        border-radius: $radiusSize;
        margin-bottom: $marginSize;

        .goods-item-img {
            width: 100%;
        }
    }
}

// 瀑布流
.goods-waterfall {
    position: relative;
    margin: $marginSize;

    &-item {
        position: absolute;
        width: 49%;
        border-radius: $radiusSize;

        .goods-item-img {
            width: 100%;
        }
    }
}
</style>
