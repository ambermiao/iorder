<template>
    <div class="payBox" v-if="getRestaurantData">
        <section class="content bg-secondary py-4">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col col-7">
                        <div class="card p-4 mb-4 shadow-sm">
                            <h3 class="mb-4 text-muted"><span class="step">1</span>訂餐詳情</h3>
                            <div class="box mb-2">
                                <p class="mb-2">取餐時間</p>
                                <div class="form-group">
                                    <date-picker v-model="pay_list.datetime" name="取餐時間" placeholder="請選擇取餐時間" type="datetime"
                                        format="YYYY-MM-DD HH:mm" :class="{ 'is-validated': errors.has('取餐時間') }"
                                        v-validate="'required'" :disabledDays="disabledDays" :time-picker-options="timePickerOptions"></date-picker>
                                    <small class="form-text text-danger" v-show="errors.has('取餐時間')">{{
                                        errors.first('取餐時間') }}</small>
                                </div>
                            </div>
                            <div class="box">
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">訂單備註</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="pay_list.remark"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="card p-4 mb-4 shadow-sm">
                            <h3 class="mb-4 text-muted"><span class="step">2</span>訂購人資料</h3>
                            <form class="row">
                                <div class="col col-lg-6 form-group">
                                    <label>訂購人姓名</label>
                                    <input type="text" class="form-control" name="姓名" placeholder="Name" :class="{ 'is-validated': errors.has('姓名') }"
                                        v-validate="'required'" v-model="member.name">
                                    <small class="form-text text-danger" v-show="errors.has('姓名')">{{
                                        errors.first('姓名') }}</small>
                                </div>
                                <div class="col col-lg-6 form-group">
                                    <label>訂購人手機號碼</label>
                                    <input type="text" name="手機號碼" class="form-control" id="phone" placeholder="Phone"
                                        :class="{ 'is-validated': errors.has('手機號碼') }" v-validate="{ required: true, regex: /^09\d{8}$/ }"
                                        v-model="member.phone">
                                    <small class="form-text text-danger" v-show="errors.has('手機號碼')">{{
                                        errors.first('手機號碼') }}</small>
                                </div>
                            </form>
                        </div>
                        <div class="card p-4 shadow-sm">
                            <h3 class="mb-4 text-muted"><span class="step">3</span>付款方式</h3>
                            <ul class="">
                                <li class="text-center border border-primary py-2" style="width:140px">
                                    <img src="../assets/images/cash.svg" width="30">
                                    <p class="pt-2 mb-0">到店付款</p>
                                </li>
                            </ul>
                            <button type="button" class="btn btn-primary mt-5" @click="finish">
                                <span v-show="!loading">完成並付款</span>
                                <clip-loader :loading="loading" :color="'#fff'" :size="'1rem'"></clip-loader>
                            </button>
                        </div>
                    </div>
                    <div class="col col-4">
                        <cart :getRestaurantData="getRestaurantData" :isCartfixed="false"></cart>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import Cart from '../components/Cart'
    import DatePicker from 'vue2-datepicker'
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
    import swal from 'sweetalert2'
    import 'sweetalert2/src/sweetalert2.scss'
    export default {
        name: 'Payment',
        components: {
            Cart,
            DatePicker,
            ClipLoader
        },
        mounted() {
            this.axios.get('/orderlist').then((response) => {
                this.orderlistData = response.data
            })
            this.$store.dispatch('getRestaurant', Number(this.$store.state.cart.restaurant_id))
        },
        data() {
            return {
                orderlistData: [],
                pay_list: {
                    datetime: '',
                    remark: '',
                    method: '到店付款',
                    buy_people: {
                        name: '',
                        phone: ''
                    }
                },
                loading: false
            }
        },
        computed: {
            cart() {
                return this.$store.state.cart.products.map((list) => {
                    const chooseAry = list.item.choose.map((item) => {
                        if (item.money > 0) {
                            if (item.select_option == 2) {
                                return item.title
                            }
                            return null
                        } else {
                            return this.optionObj[item.select_option].title
                        }
                    })
                    return {
                        title: list.item.title,
                        num: list.item.num,
                        total: list.item.total,
                        other: list.item.other,
                        choose: chooseAry
                    }
                })
            },
            member: {
                get() {
                    this.pay_list.buy_people.name = this.$store.state.member.name
                    this.pay_list.buy_people.phone = this.$store.state.member.phone
                    return this.pay_list.buy_people
                },
                set(val) {
                    this.pay_list.buy_people.name = val.name
                    this.pay_list.buy_people.phone = val.phone
                }
            },
            optionObj() {
                return this.getRestaurantData.menu.option.reduce(function (result, item) {
                    result[item.id] = item;
                    return result;
                }, {})
            },
            getRestaurantData() {
                return this.$store.state.restaurant
            },
            timePickerOptions() {
                return {
                    start: this.getRestaurantData.open_time,
                    step: '00:30',
                    end: this.getRestaurantData.close_time
                }
            }
        },
        methods: {
            disabledDays(value) {
                const date = new Date(value)
                let three = 4 * 24 * 3600 * 1000
                return date.getTime() < Date.now() - 8.64e7 || date.getTime() > Date.now() + three;
            },
            finish() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.loading = true
                        this.pay_list.id = this.orderlistData.length + 1
                        this.pay_list.total = this.$store.getters.cartTotal
                        this.pay_list.cart = this.cart
                        this.pay_list.member_id = this.$store.state.member.id
                        this.pay_list.create_time = new Date()
                        this.pay_list.restaurant_id = this.$store.state.restaurant.id
                        this.pay_list.restaurant_title = this.$store.state.restaurant.title
                        this.orderlistData.push(this.pay_list)
                        this.axios.post('/orderlist', this.orderlistData, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(() => {
                            this.loading = false
                            this.$store.dispatch('payFinish')
                            swal(
                                '訂單發送成功',
                                '訂單完成後，請準時過去取餐並付款。<br/>如要取消或更改訂單，請聯絡店家，謝謝！！',
                                'success'
                            )
                            this.$router.push({
                                name: 'home'
                            })
                        })
                    }
                })

            }
        }
    }
</script>