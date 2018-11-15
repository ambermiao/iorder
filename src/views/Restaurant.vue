<template>
  <div class="list" v-if="getRestaurantData">
    <section class="content bg-secondary pb-4" >
      <div class="photo">
        <ul class="row no-gutters">
          <li class="col-3" v-for="(img,index) in getRestaurantData.restaurant_img" :key="index"><img :src="img" alt=""></li>
        </ul>
      </div>
      <div class="container">
        <div class="row">
          <div class="col col-8">
            <div class="card item-card restaurant shadow-sm">
              <div class="card-body">
                <div class="sample box pb-2 border-bottom">
                  <div class="logo border align-top">
                    <img class="w-100" :src="getRestaurantData.logo" alt="">
                  </div>
                  <div class="title d-inline-block p-2">
                    <h3 class="card-text mb-4 text-white">{{getRestaurantData.title}}</h3>
                    <span class="tag text-muted"><b class="font-weight-normal" v-for="(tag,index) in getRestaurantData.tag_id" :key="index">{{tag}}<i v-if="index != getRestaurantData.tag_id.length - 1">,</i></b></span>
                    <span class="evaluation"><i class="icon iconfont icon-star mr-1 align-text-top small"></i>{{getRestaurantData.star}}</span>
                  </div>
                </div>
                <div class="detail box py-3 text-black-50">
                  <p><i class="icon iconfont icon-3 mr-2 align-middle"></i>{{getRestaurantData.phone}}</p>
                  <p><i class="icon iconfont icon-shijian mr-2 align-middle"></i>{{getRestaurantData.open_time}} ~ {{getRestaurantData.close_time}}</p>
                  <p><i class="icon iconfont icon-dizhi mr-2 align-middle"></i>{{getRestaurantData.address}}</p>
                  <!--<button class="btn btn-sm btn-outline-primary btn-lovely"><i class="icon iconfont icon-jushoucang mr-1 small"></i>加入收藏</button>-->
                </div>
                <div class="menu" ref="menu">
                  <div class="menu-category box border-top border-bottom bg-white" :class="{'sticky-top': is_categoryfixed,'shadow-sm': is_categoryfixed}">
                    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                      <swiper-slide v-for="category in getRestaurantData.menu.category" :key="category.id">
                        <a :class="{current:category.id == selected_category_id}" @click="choosed(category.id)">{{category.title}}</a>
                      </swiper-slide>
                      <div class="swiper-button-prev" slot="button-prev"></div>
                      <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                  </div>
                  <div class="menu-list box py-3" ref="menu">
                    <p class="text-muted text-center" v-for="category in getRestaurantData.menu.category" :key="category.id" v-if="category.id == selected_category_id">~ {{category.content}} ~</p>
                    <ul>
                      <li class="row no-gutters border p-3 mb-3 rounded justify-content-between align-items-center" v-for="menu in setMenu" :key="menu.id">
                        <div class="" v-if="menu.image"><img class="w-100" :src="menu.image" alt=""></div>
                        <div class=" Txt">
                          <h4>{{menu.title}}</h4>
                          <p class="text-black-50 mb-0">{{menu.content}}</p>
                        </div>
                        <div class="button">
                            <span class="money mr-3 align-middle text-muted">NT${{menu.money}}</span>
                            <button class="btn btn-sm btn-primary" data-toggle="modal" @click="selectedItem(menu)"><i class="icon iconfont icon-aui-icon-plus"></i></button>
                          </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!--<div class="reviews card mt-3">
              <div class="card-body py-4">
                <h5 class="card-title">2則評論：</h5>
                <ul>
                  <li class="py-3 border-bottom position-relative">
                    <h6>千卉<span class="ml-3 text-primary"><i class="icon iconfont icon-star mr-1 align-top small"></i>8.9</span></h6>
                    <span class="date text-black-50">2018年10月20日</span>
                    <p class="text-muted pt-2 mb-0">CP值太低</p>
                  </li>
                  <li class="py-3 border-bottom position-relative">
                    <h6>千卉<span class="ml-3 text-primary"><i class="icon iconfont icon-star mr-1 align-top small"></i>8.9</span></h6>
                    <span class="date text-black-50">2018年10月20日</span>
                    <p class="text-muted pt-2 mb-0">CP值太低</p>
                  </li>
                </ul>
              </div>
            </div>-->
          </div>
          <div class="col col-4 shopping-cart" ref="cart">
            <cart :getRestaurantData="getRestaurantData" :isCartfixed="is_cartfixed"></cart>
          </div>
        </div>
      </div>
    </section>
    <item-modal 
    :selectedItem="selected_item"
    :getRestaurantData="getRestaurantData"
    @changeData="changeSelectedItem"></item-modal>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ItemModal from '../components/ItemModal'
import Cart from '../components/Cart'
  export default {
    name:'restaurant',
    components: {
      swiper,
      swiperSlide,
      ItemModal,
      Cart
    },
    mounted(){
      this.$Progress.start()
      this.$store.dispatch('getRestaurant',Number(this.$route.params.id)).then(()=>{
        this.$Progress.finish()
      })
      window.addEventListener('scroll',this.fixedCategory)
    },
    data(){
      return{
        selected_category_id: 1,
        notNextTick: false,
        swiperOption: {
          slidesPerView: 'auto',
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        selected_item:null,
        is_categoryfixed: false,
        is_cartfixed: false
      }
    },
    computed:{
      getRestaurantData(){
        return this.$store.state.restaurant
      },
      setMenu(){
        return this.getRestaurantData.menu.item.filter((item)=>{
          return item.category_id == this.selected_category_id
        })
      },
      categoryTop(){
        return this.$refs.menu.offsetTop
      },
      cartTop(){
        return this.$refs.cart.offsetTop
      }
    },
    methods:{
      choosed(choose_id){
        this.selected_category_id = choose_id
      },
      selectedItem(item){
        if(item.choose_id.length > 0){
          $('#itemModal').modal('show')
          this.selected_item = item
        }else{
          this.selected_item = null
        }
      },
      changeSelectedItem(item){
        this.selected_item = item
      },
      fixedCategory(){
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop > this.categoryTop){
          this.is_categoryfixed = true
        }else{
          this.is_categoryfixed = false
        }
        if(scrollTop > this.cartTop){
          this.is_cartfixed = true
        }else{
          this.is_cartfixed = false
        }
      }
    }
  }
</script>
<style scoped>
  .swiper-slide {
    width: auto;
  }
  .swiper-button-next{
    background: url(../assets/images/right-arrow.svg) center center no-repeat,linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,1));
    background-size: 20px;
    right: 0;
    width: 20px;
  }
  .swiper-button-prev{
    background: url(../assets/images/left-arrow.svg) center center no-repeat,linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,1));
    background-size: 20px;
    left: 0;
    width: 20px;
  }
  .swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled{
    opacity: 0;
  }
</style>