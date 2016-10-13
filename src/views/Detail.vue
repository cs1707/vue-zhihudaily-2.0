<template>
  <div>
    <div class="detail-header" v-if="detail.image">
      <div class="img-wrap">
        <h1 class="detail-title">{{detail.title}}</h1>
        <span class="img-source">{{detail.image_source}}</span>
        <div class="image-container" :style="{'background-image':`url(${detail.image})`}"></div>
        <div class="img-mask"></div>
      </div>
    </div>
    <div v-html="detail.body">
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  const fetchDetail = store => {
    return store.dispatch('FETCH_DETAIL', store.state.route.params.id)
  }
  import {mapGetters, mapActions, mapState} from 'vuex'
  export default {
    computed: {
      detail () {
        if (+this.$store.state.detail.id === +this.$route.params.id) {
          return this.$store.state.detail
        }
        return {}
      }
    },
    activated () {
      fetchDetail(this.$store)
    },
    preFetch: fetchDetail
  }
</script>

<style>
  .img-wrap {
    position: relative;
    overflow: hidden;
  }
  .detail-title {
    margin: 20px 0;
    padding: 0px 40px;
    bottom: 10px;
    z-index: 1;
    position: absolute;
    color: white;
    font-size: 30px;
    text-shadow: 0px 1px 2px rgba(0,0,0,0.3);
  }
  @media (max-width: 800px) {
    .detail-title {
      font-size: 18px;
      padding: 0 15px;
    }
  }
  .img-wrap .img-source {
    position: absolute;
    bottom: 10px;
    z-index: 1;
    font-size: 12px;
    color: rgba(255,255,255,.6);
    right: 40px;
    text-shadow: 0px 1px 2px rgba(0,0,0,.3);
  }
  .img-mask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: -moz-linear-gradient(top, rgba(0,0,0,0) 25%, rgba(0,0,0,0.6) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(25%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,0.6)));
    background: -webkit-linear-gradient(top, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
    background: -o-linear-gradient(top, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
    background: -ms-linear-gradient(top, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
    background: linear-gradient(to bottom, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#99000000',GradientType=0 );
  }
  .detail-image {
    width: 100%;
  }

</style>
