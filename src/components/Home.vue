<template>
<div class="home" @scroll="onScrollChange">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <!-- 左侧插槽 -->
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon">
      </template>
      <!-- 中间插槽 -->
      <template v-slot:nav-center>
        <search
          :bgColor="navBarCurrentSlotStyle.search.bgColor"
          :hintColor="navBarCurrentSlotStyle.search.hintColor"
          :icon="navBarCurrentSlotStyle.search.icon">
        </search>
      </template>
      <!-- 右侧插槽 -->
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon">
      </template>
    </navigation-bar>
    <div class="home-content">
        <!-- swiper -->
        <my-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
        <!-- 520活动 -->
        <activity>
            <div class="activity-520">
                <img v-for="(item, index) in activityDatas"  :key="index" :src="item.icon">
            </div>
        </activity>
        <!-- 功能选项 -->
        <mode-options></mode-options>
        <!-- 秒杀模块 -->
        <seconds :dataSource="secondsData"></seconds>
        <!-- 拼购节 -->
        <activity>
          <div class="activity-pin-gou-jie">
            <img src="@imgs/haoHuoQiang.gif">
          </div>
        </activity>
        <!-- 商品列表 -->
        <goods :layoutType="'3'" :isScroll="false"></goods>
    </div>
</div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue'
import Activity from '@c/currency/Activity.vue'
import ModeOptions from '@c/currency/ModeOptions.vue'
import Seconds from '@c/seconds/Seconds.vue'
import Goods from '@c/goods/Goods.vue'
import NavigationBar from '@c/currency/NavigationBar.vue'
import Search from '@c/currency/Search.vue'

export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search
  },
  data: function () {
    return {
      swiperData: [],
      swiperHeight: '184px',
      activityDatas: [],
      secondsData: [], // 秒杀数据
      // navBar插槽样式数据：页面未开始滑动样式(默认样式)，页面滑动到锚点之后(高亮样式)
      navBarSlotStyle: {
        // 默认样式
        normal: {
          leftIcon: require('@imgs/more-white.svg'),
          search: {
            bgColor: '#ffffff',
            hintColor: '#999999',
            icon: require('@imgs/search.svg')
          },
          rightIcon: require('@imgs/message-white.svg')
        },
        // 高亮样式
        highlight: {
          leftIcon: require('@imgs/more.svg'),
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#ffffff',
            icon: require('@imgs/search-white.svg')
          },
          rightIcon: require('@imgs/message.svg')
        }
      },
      // navBar当前使用的插槽样式
      navBarCurrentSlotStyle: {},
      // navBar的定制样式
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      // 记录页面滚动值
      scrollTopValue: -1,
      // 锚点值
      ANCHOR_SCROLL_TOP: 160
    }
  },
  created: function () {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
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
        this.$http.get('/activitys'),
        this.$http.get('/seconds')
      ]).then(this.$http.spread((swiperData, activityDatas, secondsData) => {
        this.swiperData = swiperData.list
        this.activityDatas = activityDatas.list
        this.secondsData = secondsData.list
      }))
    },
    /**
     * 监听页面滚动
     * 1. 获取当前页面滚动的距离
     * 2. 计算navBar背景颜色的透明度：当前滚动的距离 / 锚点值 = navBar背景透明度opacity
     * 3. opacity >= 1，滚动距离超过锚点，变为高亮样式，否则<1，为默认样式
     */
    onScrollChange: function ($event) {
      this.scrollTopValue = $event.target.scrollTop
      const opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
      }
      this.navBarStyle.backgroundColor = 'rgba(255, 255, 255, ' + opacity + ')'
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
    overflow: hidden;
    overflow-y: auto;
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

        .activity-pin-gou-jie {
            background-color: white;
            margin-top: $marginSize;

            img {
                width: 100%;
            }
        }
    }
}
</style>
