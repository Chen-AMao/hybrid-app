<template>
<div class="home">
    <div class="home-content">
        <my-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
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
        // require('@imgs/swiper-1.jpg'),
        // require('@imgs/swiper-2.jpg'),
        // require('@imgs/swiper-3.jpg'),
        // require('@imgs/swiper-4.jpg'),
        // require('@imgs/swiper-5.jpg'),
        // require('@imgs/swiper-6.jpg'),
        // require('@imgs/swiper-7.jpg'),
        // require('@imgs/swiper-8.jpg')
      ],
      swiperData: [],
      swiperHeight: '184px'
    }
  },
  created: function () {
    this.initData()
  },
  methods: {
    // 获取数据
    initData: function () {
      // this.$http = axios
      this.$http.get('swiper')
        .then(data => {
          console.log(data)
          this.swiperData = data.list
        }).catch(err => {
          console.log(err)
        })
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
