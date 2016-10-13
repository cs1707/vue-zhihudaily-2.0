<template>
  <div class="item" :class="classObj">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        classObj: {}
      }
    },
    mounted () {
      this.$parent.rerender(this)
    },
    beforeDestroy () {
      console.log('beforeDestroy')
      this.$nextTick(() => {
        this.$parent.rerender(this, true)
      })
    }
  }
</script>
