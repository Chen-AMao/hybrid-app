<template>
  <div class="home">
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
import toolBar from '@c/ToolBar.vue'
export default {
  name: 'Main',
  components: {
    'tool-bar': toolBar
  },
  methods: {
    onChangeFragment: function (componentName) {
      console.log(componentName)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
