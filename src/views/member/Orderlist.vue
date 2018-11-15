<template>
    <div class="order">
        <h3 class="mb-4">我的訂單</h3>
        <p class="order_link">
            <a @click="select" :class="{'active':is_ing}">
                正在處理
            </a>
            <a @click="select" :class="{'active':is_finish}">
                已領取
            </a>
        </p>
        <div class="item mt-2" v-show="is_ing">
            <div class="card card-body border mb-3" v-if="orderlist_ing" v-for="(item,index) in orderlist_ing" :key="index" @click="toDetail(item.id)">
                <div class="Txt">
                    <h3>{{item.restaurant_title}}</h3>
                    <p class="mb-1 text-muted">訂餐時間： {{item.datetime}}</p>
                    <p class="mb-0 text-right">總金額： <span class="text-primary" style="font-size:20px">NT${{item.total}}</span></p>
                </div>
            </div>
            <p class="mb-0 text-center text-black-50" v-if="orderlist_ing.length ==0">您目前沒有正在處理的訂單</p>
        </div>
        <div class="item mt-2" v-show="is_finish">
            <div class="card card-body border mb-3" v-if="orderlist_finish" v-for="(item,index) in orderlist_finish"
                :key="index" @click="toDetail(item.id)">
                <div class="Txt">
                    <h3>{{item.restaurant_title}}</h3>
                    <p class="mb-1 text-muted">訂餐時間： {{item.datetime}}</p>
                    <p class="mb-0 text-right">總金額： <span class="text-primary" style="font-size:20px">NT${{item.total}}</span></p>
                </div>
            </div>
            <p class="mb-0 text-center text-black-50" v-if="orderlist_finish.length ==0">您目前沒有已領取的訂單</p>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'Orderlist',
        mounted() {
            this.axios.get('/orderlist').then((response) => {
                this.orderlist = response.data
            })
        },
        data() {
            return {
                orderlist: [],
                is_finish: false,
                is_ing: true
            }
        },
        computed: {
            member_id() {
                return this.$store.state.member_id
            },
            member_orderlist() {
                return this.orderlist.filter((item) => {
                    return item.member_id = this.member_id
                })
            },
            orderlist_ing() {
                const list = this.member_orderlist.filter((item) => {
                    return new Date(item.datetime) > new Date()
                })
                return list.map((item)=>{
                    const copy_item = Object.assign({}, item)
                    copy_item.datetime = getdate(copy_item.datetime)
                    return copy_item
                })
            },
            orderlist_finish() {
                const list = this.member_orderlist.filter((item) => {
                    return new Date(item.datetime) <= new Date()
                })
                return list.map((item)=>{
                    const copy_item = Object.assign({}, item)
                    copy_item.datetime = getdate(copy_item.datetime)
                    return copy_item
                })
            }
        },
        methods: {
            select() {
                this.is_ing = !this.is_ing
                this.is_finish = !this.is_finish
            },
            toDetail(get_id){
                this.$router.push({name:'orderdetail',params:{id:get_id}})
            }
        }
    }

    function getdate(item_date) {
        const getDate = new Date(item_date)
        const year = getDate.getFullYear()
        const month = getDate.getMonth() + 1
        const date = getDate.getDate()
        const day = getDate.getDay()
        const hour = getDate.getHours()
        const minute = getDate.getMinutes()

        function get(i) {
            return (i < 10 ? '0' : '') + i
        }
        const chineseday = ['日', '一', '二', '三', '四', '五', '六']
        return year + '年' + month + '月' + date + '日 (' + chineseday[day] + ') ' + get(hour) + ':' + get(minute)
    }
</script>