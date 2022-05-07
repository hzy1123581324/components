<template>
  <view :id="'tabs-panel-'+index">
    <slot />
  </view>
</template>

<script>
  export default {
    name: 'tabs-panel',
    // inject: ['panelid'],
    props: {
      index: {
        type: [Number, String],
        default: 0,
      }
    },
    setup() {

    }
  }
</script>

<style>
</style>
