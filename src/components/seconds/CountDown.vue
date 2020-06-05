<template>
<div class="count-down">
    <span class="count-down-end-time">{{endHours}}点场</span>
    <span class="count-down-surplus">{{surplus | filterTime}}</span>
</div>
</template>

<script>
/**
 * 传递一个活动开始的时间
 * 当前时间未到开始的时间：展示倒计时
 * 当前时间到了开始的时间：活动进行中
 * 当前时间超过开始的时间：活动已结束
 */
export default {
  props: {
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data: function () {
    return {
      // 展示活动状态
      surplus: '',
      // 距离活动开始时间的秒数
      diffSeconds: 0,
      interval: undefined
    }
  },
  created: function () {
    this.computedSurplusTime()
  },
  methods: {
    /**
       * 计算展示内容
       */
    computedSurplusTime: function () {
      if (this.interval) {
        clearInterval(this.interval)
      }
      // 当前时间
      const date = new Date()
      console.log('hours:', date.getHours())
      // 超过
      if (date.getHours() > this.endHours) {
        this.surplus = '活动已结束'
        return
      }
      // 正在进行
      if (date.getHours() === this.endHours) {
        this.surplus = '活动进行中'
        return
      }
      // 未开始
      const diffHours = this.endHours - date.getHours() - 1
      const diffMinutes = this.endHours - date.getMinutes() - 1
      const diffSeconds = this.endHours - date.getSeconds()
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds
      this.interval = setInterval(() => {
        this.diffSeconds -= 1
      }, 1000)
    }
  },
  watch: {
    diffSeconds: function (newVal) {
      const hours = Math.floor(newVal / 3600)
      const minutes = Math.floor(newVal / 60) % 60
      const seconds = newVal % 60
      this.surplus = hours + ':' + minutes + ':' + seconds

      if (newVal === 0) {
        this.computedSurplusTime()
      }
    },
    endHours: function () {
      this.computedSurplusTime()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.count-down {
    display: inline-block;
    font-size: $infoSize;
    margin-left: $marginSize;

    span {
        display: inline-block;
        padding: px2rem(2) px2rem(4);
    }

    &-end-time {
        background-color: $mainColor;
        border-top-left-radius: px2rem(4);
        border-bottom-left-radius: px2rem(4);
        border: px2rem(1) solid $mainColor;
        color: white;
    }

    &-surplus {
        background-color: white;
        border-top-right-radius: px2rem(4);
        border-bottom-right-radius: px2rem(4);
        border: px2rem(1) solid $mainColor;
        color: $mainColor;
    }
}
</style>
