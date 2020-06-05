<template>
  <div class="main">
    <!-- 动态组件 -->
    <component :is="currentComponent"></component>
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
import toolBar from '@c/currency/ToolBar.vue'
export default {
  name: 'Main',
  components: {
    'tool-bar': toolBar,
    // 异步组件
    home: () => import('@c/Home.vue'),
    shopping: () => import('@c/Shopping.vue'),
    my: () => import('@c/My.vue')
  },
  data: function () {
    return {
      currentComponent: 'home'
    }
  },
  methods: {
    // 组件切换
    onChangeFragment: function (componentName) {
      console.log(componentName)
      this.currentComponent = componentName
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
