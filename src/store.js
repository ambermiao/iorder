import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)
axios.defaults.baseURL = 'https://jsonbin.org/ambermiao/iorder'
axios.defaults.headers.common['Authorization'] = "e311ae9a-8ad0-4b12-aa75-54450f41b88c";

export default new Vuex.Store({
  state: {
    selected_tag:'',
    restaurant: null,
    status: '',
    member_id: localStorage.getItem('member') | '',
    member: null,
    is_login: localStorage.getItem('member') ? true : false,
    cart: JSON.parse(localStorage.getItem('cart')) != null ? JSON.parse(localStorage.getItem('cart')) 
          : {
            restaurant_id: localStorage.getItem('restaurant') | null,
            products: []
          }
  },
  mutations: {
    select_tag(state,data){
      state.selected_tag = data
    },
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state,data){
      state.status = 'success'
      state.member_id = data.id
      state.member = data
      state.cart.member_id = data.id
      state.is_login = true
    },
    auth_error(state){
      state.status = 'error'
      state.is_login = false
    },
    logout(state) {
      state.status = ''
      state.member_id = ''
      state.member = null
      state.cart.member_id = null
      state.is_login = false
    },
    remove_cart(state) {
      localStorage.removeItem('cart')
      state.cart.products = []
    },
    addCart(state,data){
      state.cart.products.push(data)
    },
    updateCart(state, data) {
      state.cart.products.find((item)=>{
        if(item.id == data.id){
          item.item = data.item
        }
      })
    },
    removeProduct(state,data){
      state.cart.products.splice(data,1)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    restaurant(state,data){
      state.restaurant = data
      state.cart.restaurant_id = data.id
    }
  },
  getters:{
    cartTotal(state) {
      return state.cart.products.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.item.total
      }, 0)
    },
    cartMax(state){
      return state.cart.products.reduce((accumulator, currentValue) => {
        return Math.max(accumulator, currentValue.id)
      }, 0)
    }
  },
  actions: {
    getRestaurant({commit,state},restaurant_id){
      return new Promise((resolve) => {
        if (restaurant_id != state.cart.restaurant_id) {
          commit('remove_cart')
          localStorage.setItem('restaurant', state.cart.restaurant_id)
        }
        const axios_id = restaurant_id - 1
        axios.get('/restaurant/' + axios_id).then((response) => {
          commit('restaurant', response.data)
          resolve(response)
        })
      })
      
    },
    getMember({commit,state}){
      if(state.member_id){
        const axios_id = state.member_id-1
        axios.get('/member/' + axios_id).then((response) => {
          commit('auth_success', response.data)
        }).catch(() => {
          commit('auth_error')
        })
      }
    },
    login({commit},user){
      return new Promise((resolve,reject)=>{
        commit('auth_request')
        axios.get('/member').then((response)=>{
          const memberObj = response.data.reduce(function (result, item) {
            result[item.id] = item
            return result
          }, {})
          const findmember = response.data.find((item,index)=>{
            return memberObj[index + 1].email == user.email && memberObj[index + 1].password == user.password
          })
          if(findmember){
            localStorage.setItem('member', findmember.id)
            commit('auth_success', findmember)
            resolve()
          }else{
            localStorage.removeItem('member')
            commit('auth_error')
            reject()
          }
        })
      })
    },
    register({commit},user){
      return new Promise((resolve,reject)=>{
        commit('auth_request')
        axios.get('/member').then((response)=>{
          const memberObj = response.data.reduce(function (result, item) {
            result[item.id] = item
            return result
          }, {})
          const findmember = response.data.find((item, index) => {
            return memberObj[index + 1].email == user.email
          })
          const memberData = response.data
          const len = response.data.length
          user.id = len+1
          if (!findmember) {
            memberData.push(user)
            axios.post('/member', memberData).then((res) => {
              localStorage.setItem('member', user.id)
              commit('auth_success', user)
              resolve(res)
            })
          }else{
            commit('auth_error')
            localStorage.removeItem('member')
            reject()
          }
        })
      })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('member')
        resolve()
      })
    },
    addCart({commit,state,getters},item){
      return new Promise((resolve) => {
        const product = {
          id: getters.cartMax + 1,
          hover: false,
          item: item
        }
        commit('addCart', product)
        localStorage.setItem('cart', JSON.stringify(state.cart))
        resolve()
      })
    },
    updateCart({
      commit,
      state
    }, item) {
      return new Promise((resolve) => {
        commit('updateCart',item)
        localStorage.setItem('cart', JSON.stringify(state.cart))
        resolve()
      })
    },
    payFinish({
      commit
    }) {
      return new Promise((resolve) => {
        commit('remove_cart')
        resolve()
      })
    },
  }
})
