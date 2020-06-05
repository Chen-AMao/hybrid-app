<template>
<div class="home">
    <div class="home-content">
        <!-- swiper -->
        <my-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
        <!-- 520活动 -->
        <activity>
            <div class="activity-520">
                <img v-for="(item, index) in activityDatas"  :key="index" :src="item.icon">
            </div>
        </activity>
    </div>
</div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue'
import Activity from '@c/currency/Activity.vue'

export default {
  components: {
    MySwiper,
    Activity
  },
  data: function () {
    return {
      swiperData: [],
      swiperHeight: '184px',
      activityDatas: []
    }
  },
  created: function () {
    this.initData()
  },
  methods: {
    // 获取数据
    initData: function () {
      // this.$http = axios
    //   this.$http.get('/swiper')
    //     .then(data => {
    //       console.log(data)
    //       this.swiperData = data.list
    //     }).catch(err => {
    //       console.log(err)
    //     })

      //   // 520活动数据
      //   this.$http.get('/activitys')
      //     .then(data => {
      //       console.log(data)
      //       this.activityDatas = data.list
      //     }).catch(err => {
      //       console.log(err)
      //     })

      // axios 同时发送多个请求
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys')
      ]).then(this.$http.spread((swiperData, activityDatas) => {
        this.swiperData = swiperData.list
        this.activityDatas = activityDatas.list
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.home {
    width: 100%;
    height: 100%;
    background-color: $bgColor;
    &-content {
        height: 100%;

        .activity-520 {
            margin-top: px2rem(-8);
            border-top-left-radius: px2rem(8);
            border-top-right-radius: px2rem(8);

            img {
                display: inline-block;
                width: 33.3%;
            }
        }
    }
}
</style>
