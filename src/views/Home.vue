<template>
  <div class="home">
    <section class="banner position-relative" :style= "{ 'background-image': 'url(' + banner + ')' }">
      <div class="Txt w-100 text-center">
        <h2 class="font-weight-normal text-light">微避愛點餐<span class="pr-4"></span>點餐就是快</h2>
        <Search></Search>
      </div>
    </section>
    <section class="category bg-light shadow-sm pt-3">
      <div class="container">
        <div class="row">
          <swiper :options="tagSwiperOption">
            <swiper-slide  v-for="item in getTagData" v-if="item.is_index" class="col col-lg-1 text-center" >
              <div >
                <a @click="selectedTag(item.title)">
                  <img :src="item.image" width="40" alt="">
                  <p class="pt-2 mb-0">{{item.title}}</p>
                </a>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
    <section class="bg-secondary py-6">
      <div class="container">
        <h3 class="font-weight-normal text-black-50 mb-4">熱門餐廳：</h3>          
          <div class="">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide  v-for="item in getRestaurantData">
                <div class="item mb-4" >
                  <router-link :to="{ name: 'restaurant', params: { id: item.id }}">
                    <div class="card item-card shadow-sm">
                      <div class="Img">
                        <!--<a class="lovely no-select"><i class="icon iconfont icon-jushoucang"></i></a>
                        <a class="lovely selected d-none"><i class="icon iconfont icon-jushoucanggift"></i></a>
                        -->
                        <img class="card-img-top" :src="item.list_img" alt="">
                      </div>
                      <div class="card-body">
                        <div class="sample pb-2 border-bottom">
                          <div class="logo border align-top">
                            <img class="w-100" :src="item.logo" alt="">
                          </div>
                          <div class="title d-inline-block p-2">
                            <h3 class="card-text mb-4 text-white">{{item.title}}</h3>
                            <span class="tag text-muted"><b class="font-weight-normal" v-for="(tag,index) in item.tag_id">{{tag}}<i v-if="index != item.tag_id.length - 1">,</i></b></span>
                            <span class="evaluation"><i class="icon iconfont icon-star mr-1 align-text-top small"></i>{{item.star}}</span>
                          </div>
                        </div>
                        <div class="detail pt-3 text-black-50">
                          <p><i class="icon iconfont icon-dizhi mr-2 align-middle"></i>{{item.location_id}}</p>
                          <p><i class="icon iconfont icon-shijian mr-2 align-middle"></i>訂餐時間：<span>{{item.open_time}} ~ {{item.close_time}}</span></p>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
      </div>
    </section>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Search from '../components/Search'
import banner from '@/assets/images/banner.jpg';
  export default {
    name: 'home',
    components: {
      swiper,
      swiperSlide,
      Search
    },
    created(){
      this.$store.commit('select_tag','')
      this.$Progress.start()
      this.axios.get('/tag').then((response)=>{
        this.getTagData = response.data
      }).catch((error)=>{
        console.log(error);
      })
      this.axios.get('/location').then((response)=>{
        this.getLocationData = response.data
        
      }).catch((error)=>{
        console.log(error)
      })
      this.axios.get('/restaurant').then((response)=>{
        this.getRestaurantData = response.data
        this.$Progress.finish()
      }).catch((error)=>{
        console.log(error)
      })
    },
    data(){
      return{
        getTagData:[],
        getLocationData:[],
        getRestaurantData:[],
        swiperOption: {
          notNextTick: false,
          spaceBetween: 10,
          slidesPerView: 'auto',
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        tagSwiperOption: {
          notNextTick: false,
          slidesPerView: 'auto',
          freeMode: true,
          spaceBetween: 0,
        },
        banner
      }
    },
    methods:{
      selectedTag(tag){
        this.$store.commit('select_tag',tag)
        this.$router.push({name:'list'})
      }
    }
  }
</script>
<style scoped>
  .swiper-slide {
    width: 359px;
  }
  .swiper-container{
    padding-bottom: 20px;
  }
</style>