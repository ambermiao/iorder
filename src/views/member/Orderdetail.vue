<template>
    <div class="order" v-if="orderlist">
        <h3 class="mb-4 text-primary">{{orderlist.restaurant_title}}</h3>
        <ul class="info">
            <li class="mb-2">訂購人姓名：{{orderlist.buy_people.name}}</li>
            <li class="mb-2">訂購人電話：{{orderlist.buy_people.phone}}</li>
            <li>取餐時間：{{getdatetime}}</li>
        </ul>
        <div class="menu mt-5">
            <h4 class="mt-3">訂單明細：</h4>
            <ul class="py-4 border-bottom border-top">
                <li class="mb-2" v-for="item in orderlist.cart">
                    <div class="item">
                        <span class="title">{{item.title}}</span>
                        <span class="num ml-2">x {{item.num}}</span>
                        <span class="money float-right">NT${{item.total}}</span>
                    </div>
                    <div class="add-item text-black-50 pl-3">
                        <p class="mb-0" v-for="option in item.choose" v-if="option">+
                            {{option}}</p>
                    </div>
                </li>
            </ul>
            <div class="total-box pt-3">
                <div class="total mb-3">
                    <span>總金額</span>
                    <span class="money float-right text-primary" style="font-size:20px">NT${{orderlist.total}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Orderdetail',
        mounted() {
            const ary_id = this.$route.params.id - 1
            this.axios.get('/orderlist/'+ary_id).then((response) => {
                this.orderlist = response.data
            })
        },
        data() {
            return {
                orderlist: null
            }
        },
        computed: {
            getdatetime(){
                return getdate(this.orderlist.datetime)
            }
        },
        methods: {
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