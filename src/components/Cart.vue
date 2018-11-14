<template>
    <div class="card shadow-sm">
        <div class="card-body py-4">
            <h5 class="card-title">{{getRestaurantData.title}}</h5>
            
            <ul class="py-4 border-bottom border-top">
                <p class="text-black-50 text-center" v-if="cart.products.length == 0">您的購物車尚未放入任何產品，現在開始選購吧！</p>
                <li class="mb-2" v-else v-for="choosed in cart.products" @click="updateItem(choosed)">
                    <div class="item">
                        <span class="title">{{choosed.item.title}}</span>
                        <span class="num ml-2">x {{choosed.item.num}}</span>
                        <span class="money float-right">NT${{choosed.item.total}}</span>
                    </div>
                    <div class="add-item text-black-50 pl-3">
                        <p class="mb-0" v-for="option in choosed.item.choose" v-if="option.money > 0 && option.select_option == 2">+
                            {{option.title}}</p>
                        <p class="mb-0" v-for="option in choosed.item.choose" v-if="option.money == 0">+
                            {{optionObj[option.select_option].title}}</p>
                        <p class="mb-0" v-if="choosed.item.other">+ {{choosed.item.other}}</p>
                    </div>
                </li>
            </ul>
            <div class="total-box pt-3">
                <div class="total mb-3">
                    <span>總金額</span>
                    <span class="money float-right text-primary">NT${{total}}</span>
                </div>
                <button class="btn btn-primary w-100" v-if="!is_payment" @click="pay">結帳</button>
            </div>
        </div>
        <UpdateItemModal :selectedCart="selectedCart" :optionObj="optionObj"></UpdateItemModal>
    </div>
</template>
<script>
    import UpdateItemModal from './UpdateItemModal'
    export default {
        name: 'cart',
        components: {
            UpdateItemModal
        },
        props: {
            getRestaurantData: Object,
        },
        
        data() {
            return {
                selectedCart: null
            }
        },
        computed: {
            is_payment(){
                if(this.$route.path == '/payment'){
                    return true
                }else{
                    return false
                }
                
            },
            optionObj() {
                return this.getRestaurantData.menu.option.reduce(function (result, item) {
                    result[item.id] = item;
                    return result;
                }, {})
            },
            cart() {
                return this.$store.state.cart
            },
            total() {
                return this.$store.getters.cartTotal
            }
            
        },
        methods: {
            updateItem(item) {
                if(!this.is_payment){
                    $('#cartModal').modal('show')
                    this.selectedCart = item
                }                
            },
            pay(){
                if(this.$store.state.is_login){
                    this.$router.push({name: 'payment'})
                }else{
                    this.$router.push({name: 'login'})
                }
                
            }
        }

    }
</script>