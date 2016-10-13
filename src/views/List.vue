<template>
  <div>
    <carousel>
      <carousel-item v-for="(item, index) in top_stories">
        <div :style="{'background-image':`url(${item.image})`}" class="image-container"></div>
        <router-link :to="`detail/${item.id}`" class="carousel-caption">
          <h1 class="zhihu-title">
            {{item.title}}
          </h1>
        </router-link>
      </carousel-item>
    </carousel>
    <div class="list" v-for="day in list">
      <div class="list-title">
        {{day.date | date}}
      </div>
      <router-link :to="`detail/${item.id}`" v-for="item in day.stories" class="media">
        <div class="media-body">
          {{item.title}}
        </div>
        <div class="media-right">
          <img :src="item.images[0]" alt="" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import store from '../store'
  import _ from 'lodash'
  import Carousel from '../components/Carousel.vue'
  import CarouselItem from '../components/Carousel-item.vue'

  const fetchLatest = store => store.dispatch('FETCH_LATEST')

  export default {
    components: {
      Carousel,
      CarouselItem
    },
    created () {
      this.scrollListener = _.throttle(e => {
        if (window.innerHeight + document.body.scrollTop + 150 >= document.body.offsetHeight) {
          this.loadMore()
        }
      }, 250)
    },
    data () {
      return {
        isLoading: false
      }
    },
    computed: {
      ...mapState({
        list: state => state.list
      }),
      top_stories () {
        let top = this.list[0]
        if (top) {
          return top.top_stories
        }
        return []
      }
    },
    methods: {
      loadMore () {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        store.dispatch('FETCH_BEFORE')
          .then(() => {
            this.isLoading = false
          }, () => {
            this.isLoading = false
          })
      }
    },
    preFetch: fetchLatest,
    beforeMount () {
      if (!this.list.length) {
        fetchLatest(this.$store)
      }
    },
    activated () {
      window.addEventListener('scroll',  this.scrollListener)
    },
    deactivated () {
      window.removeEventListener('scroll', this.scrollListener)
    },
    beforeRouteLeave (to, from, next) {
      sessionStorage.setItem('scrollTop', document.body.scrollTop)
      next()
    }
  }
</script>

<style scoped>
  .carousel-caption:hover {
    text-decoration: none;
    color: #fff;
  }
</style>
<style>
  .image-container {
    height: 450px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .zhihu-title {
    font-size: 30px;
    color: #fff;
  }
  @media (max-width: 800px) {
    .image-container {
      height: 200px;
    }
    .list {
      padding-left: 10px;
      padding-right: 10px;
    }
    .zhihu-title {
      font-size: 18px;
      margin-bottom: 0;
    }
    .carousel-indicators {
      bottom: 0;
    }
  }

  .list-title {
    padding-top: 15px;
    padding-bottom: 15px;
    color: #999;
    font-size: 16px;
    font-weight: bold;
  }
  .media {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 15px;
    min-height: 80px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 4px 6px #ccc;
  }
  .media:hover,
  .media:focus {
    transform: scale(1.01);
    text-decoration: none;
    outline: none;
  }

  .media-body {
    color: #444;
    font-size: 16px;
    text-decoration: none;
    padding-right: 10px;
  }
  .media-right img {
    width: 100px;
    height: 100px;
  }
  .media:last-child {
    margin-bottom: 0;
  }
  .carousel-image {
    width: 100%;
  }

</style>
