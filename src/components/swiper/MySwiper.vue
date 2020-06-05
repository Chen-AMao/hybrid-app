<template>
    <swiper :options="swiperOptions">
        <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
            <img class="swiper-slide-img" :style="{height: height}" :src="item">
        </swiper-slide>

        <template v-slot:pagination>
            <div class="swiper-pagination"></div>
        </template>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  props: {
    // slide高度
    height: {
      type: String,
      default: 'auto'
    },
    // 数据源
    swiperImgs: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data: function () {
    return {
      // swiper配置
      swiperOptions: {
        // 自动滚动
        autoplay: true,
        // swiper高度跟随swiperSlide高度变化
        autoHeight: true,
        // 分页器设置效果
        pagination: {
          // 分页器对应的html元素
          el: '.swiper-pagination',
          // 分页器样式
          type: 'bullets',
          // 分页器内的元素添加类名
          bulletClass: 'custom-bullet-class'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '@css/style.scss';

.swiper-pagination {
    bottom: px2rem(12);
    .custom-bullet-class {
        box-sizing: border-box;
        border-radius: 100%;
        height: px2rem(6);
        width: px2rem(6);
        border: px2rem(1) solid #fff;
        margin: 0 px2rem(4);
        display: inline-block;
        opacity: 1;
    }
    .swiper-pagination-bullet-active {
        background: white;
    }
}
</style>
