<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg  w-100" :class="[is_home? 'navbar-dark position-absolute':'navbar-light bg-light shadow-sm',is_list? 'fixed-top':'']">
      <div class="container px-0">
        <router-link to="/" class="navbar-brand">
          <img v-if="is_home" src="./assets/images/logo_white.svg" width="230" />
          <img v-else src="./assets/images/logo.svg" width="230" />
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="searchBox pl-4" v-if="is_list">
          <Search></Search>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link cart" @click="linkRestaurant">
                <span class="money">$ {{cartTotal}}</span>
                <i class="icon iconfont icon-gouwuche"></i>
              </a>
            </li>
            <li class="nav-item dropdown" v-if="is_login">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="member">
                <i class="icon iconfont icon-geren mr-1 login-icon align-middle"></i>{{member.name}}
              </a>
              <div class="dropdown-menu">
                <router-link to="/member/orderlist" class="dropdown-item">我的訂單</router-link>
                <router-link to="/member/info" class="dropdown-item">個人檔案</router-link>
                <a class="dropdown-item" @click="logoutAction">登出</a>
              </div>
            </li>
            <li class="nav-item dropdown" v-else>
              <a class="nav-link" data-toggle="modal" data-target="#loginModal">
                <i class="icon iconfont icon-geren mr-1 login-icon align-middle"></i>登入/註冊
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
    <footer class="bg-white  pb-3 border-top" :class="is_payment ? 'pt-3':'pt-5'">
      <div class="container">
        <div class="row pb-5" v-if="!is_payment">
          <div class="col col-lg-3">
            <div class="downLogo"><img src="./assets/images/downLogo.svg" width="150" /></div>
            <div class="social mt-4 text-black-50">
              <a><i class="fab fa-facebook-f"></i></a>
              <a><i class="fab fa-instagram"></i></a>
              <a><i class="fab fa-youtube"></i></a>
            </div>
          </div>
          <div class="col col-lg-2">
            <h6>關於微碧愛普</h6>
            <ul class="list mt-4 text-black-50">
              <li><a>聯絡我們</a></li>
              <li><a>團隊介紹</a></li>
              <li><a>人才招募</a></li>
              <li><a>部落格</a></li>
            </ul>
          </div>
          <div class="col col-lg-2">
            <h6>開發產品</h6>
            <ul class="list mt-4 text-black-50">
              <li><a>功能特色</a></li>
              <li><a>價格方案</a></li>
              <li><a>Q&A</a></li>
              <li><a>週邊配件</a></li>
              <li><a>行動支付</a></li>
            </ul>
          </div>
          <div class="col col-lg-2">
            <h6>下載APP</h6>
            <ul class="list mt-4">
              <li><a><img src="./assets/images/download.svg" width="120" /></a></li>
            </ul>
          </div>
          <div class="col col-lg-3">
            <h6>訂閱最新消息</h6>
            <form action="" class="mt-4">
              <div class="form-group">
                <label class="text-black-50" for="exampleInputEmail1">輸入電子郵件：</label>
                <input type="email" class="form-control text-black-50" id="exampleInputEmail1" aria-describedby="emailHelp"
                  placeholder="Enter email">
              </div>
              <button class="btn btn-sm btn-primary" type="submit">訂閱</button>
            </form>
          </div>
        </div>
        <div class="copy text-black-50 text-right font-weight-light" style="font-size:13px">
          © Copyright 2018 by Amber Chen
        </div>
      </div>
    </footer>
    <login-modal></login-modal>
  </div>
</template>
<script>
  import LoginModal from './components/LoginModal'
  import Search from './components/Search.vue'
  export default {
    components: {
      LoginModal,
      Search
    },
    mounted() {
      this.$store.dispatch('getMember')
    },
    data() {
      return {
      }
    },
    computed: {
      is_home() {
        if (this.$route.path == '/') {
          return true
        }
        return false
      },
      is_list() {
        if (this.$route.path == '/restaurant') {
          return true
        }
        return false
      },
      is_login() {
        return this.$store.state.is_login
      },
      is_payment(){
        if (this.$route.path == '/payment') {
          return true
        }
        return false
      },
      member(){
        return this.$store.state.member
      },
      cartTotal(){
        return this.$store.getters.cartTotal
      }
    },
    methods:{
      setData (err, post) {
        if (err) {
          this.error = err.toString()
        } else {
          this.$Progress.finish()
        }
      },
      logoutAction(){
        this.$store.dispatch('logout').then(()=>{
          this.$router.go(0)
        })
      },
      linkRestaurant(){
        if(this.$store.getters.cartTotal > 0){
          this.$router.push({name:'restaurant',params:{id:this.$store.state.cart.restaurant_id}})
        }
      }
    }
  };
</script>