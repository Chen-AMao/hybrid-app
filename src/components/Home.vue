<template>
<div class="home">
    <div class="home-content">
        <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
    </div>
</div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue'

export default {
  components: {
    MySwiper
  },
  data: function () {
    return {
      swiperImgs: [
        require('@imgs/swiper-1.jpg'),
        require('@imgs/swiper-2.jpg'),
        require('@imgs/swiper-3.jpg'),
        require('@imgs/swiper-4.jpg'),
        require('@imgs/swiper-5.jpg'),
        require('@imgs/swiper-6.jpg'),
        require('@imgs/swiper-7.jpg'),
        require('@imgs/swiper-8.jpg')
      ],
      swiperHeight: '184px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.home {
    width: 100%;
    height: 100%;

    &-content {
        height: 100%;
    }
}
</style>
