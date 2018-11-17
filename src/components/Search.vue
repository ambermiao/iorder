<template>
    <div class="search">
        <form class="form-inline search" :class="is_home ? 'mt-5 d-inline-block':''" @submit.prevent="getSearch">
          <div class="label">
            <i class="icon iconfont icon-dangdi"></i>
            <select class="form-control pl-5" :class="{'border-0':is_home}" v-model="search.location" @change="locationChange">
              <option value="">所有地區</option>
              <option v-for="item in getLocationData" :value="item.title" >{{item.title}}</option>
            </select>
            <i class="icon iconfont icon-xiangxiajiantou arrow-bottom"></i>
          </div>
          <div class="label restaurant-search mx-2">
            <i class="icon iconfont icon-sousuo"></i>
            <v-select class="form-control py-0 pl-5" :class="{'border-0':is_home}"  label="title" :options="options" v-model="search.restaurant" @input="restaurantChange" placeholder="請輸入餐廳名稱或地址"></v-select>
          </div>
          <button class="btn btn-primary px-4" type="submit" v-if="is_home">Search</button>
        </form>
    </div>
</template>
<script>
import vSelect from 'vue-select'
export default {
    name: 'Search',
    components: {
      vSelect
    },
    mounted() {
        this.axios.get('/location').then((response) => {
            this.getLocationData = response.data
        }).catch((error) => {
            console.log(error)
        })
        this.axios.get('/restaurant').then((response)=>{
            this.getRestaurantData = response.data
        }).catch((error)=>{
            console.log(error)
        })
        if(this.is_home == false){
            this.search.location = this.$route.query.location_id ? this.$route.query.location_id : ''
        }
    },  
    data(){
      return{
        getLocationData:[],
        getRestaurantData:[],
        search:{
          location: '',
          restaurant: null
        },
      }
    },
    computed:{
        is_home() {
            if (this.$route.path == '/') {
                return true
            }
            return false
        },
        options(){
            this.search.restaurant = null
            if(this.search.location !='' && this.search.location != ''){
                const search =  this.getRestaurantData.filter((item)=>{
                    return item.location_id.includes(this.search.location)
                })
                return search
            }else{
            return this.getRestaurantData.map((item)=>{
                return {
                    id: item.id,
                    title: item.title
                }
            })
            }
        }
    },
    methods: {
        locationChange(){
            if(this.is_home == false){
                if(this.search.location == ''){
                    this.$router.push({ name: 'list'})
                }else{
                    this.$router.push({ name: 'list', query: { location_id: this.search.location }})
                }
            }
        },
        restaurantChange(val){
            if(this.is_home == false){
                if(val){
                    this.$router.push({ name: 'restaurant', params: { id: val.id }})
                }
            }
        },
        getSearch(){
            if(this.search.restaurant){
                this.$router.push({ name: 'restaurant', params: { id: this.search.restaurant.id }})
            }else{
                if(this.search.location == ''){
                    this.$router.push({ name: 'list'})
                }else{
                    this.$router.push({ name: 'list', query: { location_id: this.search.location }})
                }
                
            }
        }
    }
}
</script>