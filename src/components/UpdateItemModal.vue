<template>
    <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" v-if="selectedCart">
                <div class="modal-header">
                    <div class="title">
                        <h5 class="modal-title" id="cartModalLabel">{{selectedCart.item.title}}</h5>
                        <p class="text-black-50 mb-0">{{selectedCart.item.content}}</p>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="box mb-4" v-for="item in getCart.item.choose" v-if="item.money == 0">
                        <h6 class="mb-3">{{item.title}}選擇</h6>
                        <div class="option row">
                            <div class="btn-group-toggle col-3" v-for="option in item.option_id">
                                <label class="btn btn-sm btn-outline-primary w-100"  :class="{'active':option == item.select_option}">
                                    <input type="radio" name="options" :id="option" :value="option" v-model="item.select_option"> {{optionObj[option].title}}<br /><span v-if="option.money > 0">+{{option.money}}元</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="box mb-4" >
                        <h6 class="mb-3">加料選擇</h6>
                        <div class="option row" >
                            <div class="col-3 btn-group-toggle" v-for="item in getCart.item.choose" v-if="item.money > 0">
                                <label class="btn btn-sm btn-outline-primary w-100" :class="{'active':item.select_option == 2}">
                                    <input type="checkbox" :true-value="2" :false-value="1" v-model="item.select_option"> {{item.title}}<br /><span>+{{item.money}}元</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        <h6 class="mb-3">其他</h6>
                        <div class="form-group">
                            <textarea class="form-control" rows="3" placeholder="例如：不要洋蔥，不要菜" v-model="getCart.item.other">{{getCart.item.other}}</textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-between row ">
                    <div class="col col-lg-6 left-box">
                        <p class="text-muted mb-2">總金額：NT${{total}}</p>
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" @click="getCart.item.num--">-</a>
                            </li>
                            <li class="page-item"><a class="page-link disable">{{getCart.item.num}}</a></li>
                            <li class="page-item"><a class="page-link" @click="getCart.item.num++">+</a></li>
                        </ul>
                    </div>

                    <button type="button" class="col col-lg-5 btn btn-primary" @click="updateCart">更新購物車</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'updateItemModal',
        props: {
            selectedCart: Object,
            optionObj: Object
        },
        data() {
            return {
                cart: {}
            }
        },
        computed: {
            getCart(){
                const cart =JSON.parse( JSON.stringify(this.selectedCart))
                this.cart = cart
                return this.cart
            },
            total(){
                let money = this.selectedCart.item.money
                this.cart.item.choose.forEach((item)=>{
                    if(item.money > 0 && item.select_option == 2){
                        money += item.money
                    }
                    else if(item.money == 0){
                        money += this.optionObj[item.select_option].money
                    }
                })
                this.cart.item.total = money * this.cart.item.num
                return money * this.cart.item.num
            }
        },
        methods:{
            updateCart(){
                this.$store.dispatch('updateCart',this.getCart).then(()=>{
                    $('#cartModal').modal('hide')
                })
            }
        }
    }
</script>
<style scoped>
</style>