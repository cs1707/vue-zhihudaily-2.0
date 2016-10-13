<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/">
          <img src="./assets/logo.png" alt="" class="zhihu-logo">
        </router-link>
        <router-link to="/">
          知乎日报
        </router-link>
        <a href="https://github.com/cs1707/vue-zhihudaily-2.0" target="_blank" class="github">
          Built with Vue.js 2.0
        </a>
      </nav>
    </header>
    <transition
      name="slide"
      :enter-active-class="enterActiveClass"
    >
      <keep-alive>
        <router-view class="view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        enterActiveClass: 'animated fadeInRight'
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (toDepth > fromDepth) {
          this.enterActiveClass = 'animated fadeInRight'
        } else {
          this.enterActiveClass = 'animated fadeInLeft'
        }
      }
    }
  }
</script>

<style>
  @import './assets/carousel.css';
  @import './assets/zhihu.css';
  @import '../node_modules/animate.css/animate.css';

  body {
    font-family:  "Lucida Grande",
                  "Helvetica Neue",
                  Helvetica, Arial,
                  "Hiragino Sans GB",
                  "Hiragino Sans GB W3",
                  "WenQuanYi Micro Hei",
                  "Microsoft YaHei UI",
                  "Microsoft YaHei",
                  sans-serif;
    -webkit-font-smoothing: antialiased;
    background: #f6f6f6;
  }
  .inner,
  .view {
    max-width: 800px;
    margin: auto;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #009dd7;
    z-index: 100;
  }
  .inner {
    padding: 5px 10px;
  }
  .zhihu-logo {
    height: 30px;
  }
  .inner > a {
    display: inline-block;
    color: #fff;
    vertical-align: middle;
    padding-right: 6px;
    font-size: 16px;
    line-height: 30px;
    font-weight: bold;
  }
  .inner a.router-link-active {
    font-weight: bold;
  }
  .inner > a:hover,
  .inner > a:focus {
    text-decoration: none;
    outline: none;
  }
  .github {
    float: right;
    padding: 0;
  }
  .view {
    padding-top: 40px;
  }
</style>
