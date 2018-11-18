<template>
  <div class="list mobile">
    <section class="content bg-secondary pt-7 pb-4">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-3">
            <div class="filterBox bg-white p-3 mb-4 shadow-sm rounded is-mobile d-flex" data-toggle="modal" data-target="#filterModal">
              <i class="icon iconfont icon-filter- mr-3 text-primary align-middle"></i>
              <span class="d-inline-block text-muted pt-1">篩選</span>
              <i class="icon iconfont icon-xiangxiajiantou text-primary"></i>
            </div>
            <div class="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="filterModalLabel"
              aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">篩選</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body selector">
                    <Search></Search>
                    <div class="block pt-4 pb-3">
                      <h6 class="pb-2">餐廳分類</h6>
                      <div class="custom-control custom-checkbox my-1" v-for="item in getTagData">
                        <input type="checkbox" class="custom-control-input" :id="item.id" :value="item.title" v-model="select_tags">
                        <label class="custom-control-label" :for="item.id">{{item.title}}</label>
                      </div>
                    </div>
                    <div class="block pt-3 border-top">
                      <h6 class="pb-2">評價得分</h6>
                      <div class="custom-control custom-radio my-1">
                        <input type="radio" id="rate_9" name="customRadio" class="custom-control-input" value="9"
                          v-model.number="rate">
                        <label class="custom-control-label" for="rate_9">9+超棒</label>
                      </div>
                      <div class="custom-control custom-radio my-1">
                        <input type="radio" id="rate_8" name="customRadio" class="custom-control-input" value="8"
                          v-model.number="rate">
                        <label class="custom-control-label" for="rate_8">8+很讚</label>
                      </div>
                      <div class="custom-control custom-radio my-1">
                        <input type="radio" id="rate_7" name="customRadio" class="custom-control-input" value="7"
                          v-model.number="rate">
                        <label class="custom-control-label" for="rate_7">7+很好</label>
                      </div>
                      <div class="custom-control custom-radio my-1">
                        <input type="radio" id="rate_6" name="customRadio" class="custom-control-input" value="6"
                          v-model.number="rate">
                        <label class="custom-control-label" for="rate_6">6+滿意</label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="selector bg-white px-4 pb-4 shadow-sm rounded mobile-hide">
              <div class="block pt-4 pb-3">
                <h6 class="pb-2">餐廳分類</h6>
                <div class="custom-control custom-checkbox my-1" v-for="item in getTagData">
                  <input type="checkbox" class="custom-control-input" :id="item.id" :value="item.title" v-model="select_tags">
                  <label class="custom-control-label" :for="item.id">{{item.title}}</label>
                </div>
              </div>
              <div class="block pt-3 border-top">
                <h6 class="pb-2">評價得分</h6>
                <div class="custom-control custom-radio my-1">
                  <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" value="9"
                    v-model.number="rate">
                  <label class="custom-control-label" for="customRadio1">9+超棒</label>
                </div>
                <div class="custom-control custom-radio my-1">
                  <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" value="8"
                    v-model.number="rate">
                  <label class="custom-control-label" for="customRadio2">8+很讚</label>
                </div>
                <div class="custom-control custom-radio my-1">
                  <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" value="7"
                    v-model.number="rate">
                  <label class="custom-control-label" for="customRadio3">7+很好</label>
                </div>
                <div class="custom-control custom-radio my-1">
                  <input type="radio" id="customRadio4" name="customRadio" class="custom-control-input" value="6"
                    v-model.number="rate">
                  <label class="custom-control-label" for="customRadio4">6+滿意</label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-9 restaurant-list">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-6 item mb-4" v-for="item in restaurantChange">
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
                          <span class="tag text-muted"><b class="font-weight-normal" v-for="(tag,index) in item.tag_id">{{tag}}<i
                                v-if="index != item.tag_id.length - 1">,</i></b></span>
                          <span class="evaluation"><i class="icon iconfont icon-star mr-1 align-text-top small"></i>{{item.star}}</span>
                        </div>
                      </div>
                      <div class="detail pt-3 text-black-50">
                        <p><i class="icon iconfont icon-dizhi mr-2 align-middle"></i>{{item.location_id}}</p>
                        <p><i class="icon iconfont icon-shijian mr-2 align-middle"></i>訂餐時間：<span>{{item.open_time}} ~
                            {{item.close_time}}</span></p>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<script>
  import Search from '../components/Search.vue'
  export default {
    components: {
      Search
    },
    mounted() {
      this.$Progress.start()
      this.axios.get('/restaurant').then((response) => {
        this.getRestaurantData = response.data
        this.$Progress.finish()
      }).catch((error) => {
        console.log(error)
      })
      this.axios.get('/tag').then((response) => {
        this.getTagData = response.data
      }).catch((error) => {
        console.log(error);
      })
      if (this.$store.state.selected_tag) {
        const tag = this.$store.state.selected_tag
        this.select_tags.push(tag)
        this.$store.commit('select_tag', '')
      }
    },
    data() {
      return {
        getTagData: [],
        getRestaurantData: [],
        select_tags: [],
        rate: null
      }
    },
    computed: {
      select_location() {
        if (this.$route.query.location_id) {
          return this.$route.query.location_id
        } else {
          return ''
        }
      },

      restaurantChange() {
        const location = this.select_location ? 1 : 0
        const tag = this.select_tags.length > 0 ? 2 : 0
        const rate = this.rate ? 4 : 0
        const total = location + tag + rate
        switch (total) {
          case 0:
            return this.getRestaurantData
            break;
          case 1:
            return getLocation(this.getRestaurantData, this.select_location)
            break;
          case 2:
            let data = this.getRestaurantData
            return getTag(data, this.select_tags)
            break;
          case 3:
            let data_filter = getLocation(this.getRestaurantData, this.select_location)
            return getTag(data_filter, this.select_tags)
            break;
          case 4:
            return getRate(this.getRestaurantData, this.rate)
            break;
          case 5:
            let location_filter = getLocation(this.getRestaurantData, this.select_location)
            return getRate(location_filter, this.rate)
            break;
          case 6:
            let restaurant = this.getRestaurantData
            let tag_change = getTag(restaurant, this.select_tags)
            return getRate(tag_change, this.rate)
            break;
          case 7:
            let location = getLocation(this.getRestaurantData, this.select_location)
            let tag_changes = getTag(location, this.select_tags)
            return getRate(tag_changes, this.rate)
            break;
        }
      }
    }

  }

  function getLocation(data, select_location) {
    return data.filter((item) => {
      return item.location_id == select_location
    })
  }

  function getTag(data, select_tags) {
    select_tags.forEach((tag) => {
      const selected = data.filter((item) => {
        return item.tag_id.includes(tag)
      })
      data = selected
    })
    return data
  }

  function getRate(data, rate) {
    return data.filter((item) => {
      return Math.floor(item.star) == rate
    })
  }
</script>