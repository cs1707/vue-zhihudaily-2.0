<template>
  <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li v-for="(i, index) in list" :class="{ active: i.classObj.active }" @click="to(i)"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
      <slot></slot>
    </div>

    <!-- Controls -->
    <a class="left carousel-control" @click="prev()" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" @click="next()" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
        list: [],
        interval: null,
        sliding: false
      }
    },
    mounted () {
      this.interval = setInterval(() => {
          this.next()
        }, 5000)
    },
    beforeDestroy () {
      clearInterval(this.interval)
      this.sliding = false
    },
    methods: {
      to (next) {
        let activeIndex = this.list.findIndex((item) => {
          return item.classObj.active
        })
        let nextIndex = this.list.indexOf(next)
        let type = nextIndex > activeIndex ? 'next' : 'prev'
        if (this.sliding) {
          return
        }
        this.slide(type, next)
      },
      next () {
        if (this.sliding) {
          return
        }
        this.slide('next')
      },
      prev () {
        if (this.sliding) {
          return
        }
        this.slide('prev')
      },
      slide (type, next) {
        if (!document.body.contains(this.$el)) {
          this.sliding = false
          return
        }
        this.sliding = true
        let active = this.list.find((item) => {
          return item.classObj.active
        })
        next = next || this.getItemFromDirection(type, active)
        if (next === active) {
          return
        }
        let direction = type === 'next' ? 'left': 'right'
        Vue.set(next.classObj, type, true)
        Vue.nextTick(() => {
          next.$el.offsetWidth // force reflow
          Vue.set(active.classObj, direction, true)
          Vue.set(next.classObj, direction, true)
        })
        let listener = () => {
          next.classObj = {
            [type]: false,
            [direction]: false,
            active: true
          }
          active.classObj = {
            [direction]: false,
            active: false
          }
          this.sliding = false
          active.$el.removeEventListener('transitionend', listener)
        }
        active.$el.addEventListener('transitionend', listener)
      },
      getItemFromDirection (type, active) {
        let index = this.list.indexOf(active)
        if (index === -1) {
          return
        }
        let nextIndex = type === 'next' ? index + 1 : index - 1
        nextIndex = (nextIndex + this.list.length) % this.list.length
        return this.list[nextIndex]
      },
      rerender (vm, isRemove) {
        if (isRemove) {
          this.remove(this.list, vm)
        } else {
          this.list.push(vm)
        }
        this.list.forEach((item, index)=> {
          item.classObj = {
            active: index === 0
          }
        })
        this.sliding = false
      },
      remove(arr = [], item) {
        let index = arr.indexOf(item)
        if (index === -1) {
          return
        }
        arr.splice(index, 1)
      }
    }
  }
</script>
