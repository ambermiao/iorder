<template>
    <div class="modal fade" id="itemModal" tabindex="-1" role="dialog" aria-labelledby="itemModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" v-if="selectedItem">
                <div class="modal-header">
                    <div class="title">
                        <h5 class="modal-title" id="itemModalLabel">{{selectedItem.title}}</h5>
                        <p class="text-black-50 mb-0">{{selectedItem.content}}</p>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="box mb-4" v-for="item in choose_item" :key="item.id" v-if="item.money == 0">
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
                            <div class="col-3 btn-group-toggle" v-for="item in choose_item" :key="item.id" v-if="item.money > 0">
                                <label class="btn btn-sm btn-outline-primary w-100" :class="{'active':item.select_option == 2}">
                                    <input type="checkbox" :true-value="2" :false-value="1" v-model="item.select_option"> {{item.title}}<br /><span>+{{item.money}}元</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        <h6 class="mb-3">其他</h6>
                        <div class="form-group">
                            <textarea class="form-control" rows="3" placeholder="例如：不要洋蔥，不要菜" v-model="other">{{other}}</textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-between row ">
                    <div class="col col-lg-6 left-box">
                        <p class="text-muted mb-2">總金額：NT${{total}}</p>
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" @click="num--">-</a>
                            </li>
                            <li class="page-item"><a class="page-link disable">{{num}}</a></li>
                            <li class="page-item"><a class="page-link" @click="num++">+</a></li>
                        </ul>
                    </div>

                    <button type="button" class="col col-lg-5 btn btn-primary" @click="addToCart">加入購物車</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'itemModal',
        props: {
            selectedItem: Object,
            getRestaurantData: Object
        },
        data() {
            return {
                other: '',
                num: 1,
                choose_item: []
            }
        },
        computed: {
            optionObj() {
                return this.getRestaurantData.menu.option.reduce(function (result, item) {
                    result[item.id] = item;
                    return result;
                }, {})
            },
            chooseObj() {
                return this.getRestaurantData.menu.choose.reduce(function (result, item) {
                    result[item.id] = item;
                    return result;
                }, {})
            },
            itemChoose(){
                const choose =this.selectedItem.choose_id.map((item)=>{
                    return JSON.parse( JSON.stringify(this.chooseObj[item]) )
                })
                this.choose_item = choose
                return choose
            },
            total(){
                let money = this.selectedItem.money
                this.itemChoose.forEach((item)=>{
                    if(item.money > 0 && item.select_option == 2){
                        money += item.money
                    }
                    else if(item.money == 0){
                        money += this.optionObj[item.select_option].money
                    }
                })
                return money * this.num
            }
        },
        methods:{
            addToCart(){
                const select_item = JSON.parse( JSON.stringify(this.selectedItem) );
                select_item.total = this.total
                select_item.other = this.other
                select_item.num = this.num
                select_item.choose = this.choose_item
                this.$store.dispatch('addCart',select_item).then(()=>{
                    $('#itemModal').modal('hide')
                    this.num = 1
                    this.other = ''
                    this.$emit('changeData',null)
                })
            }
        }
    }
</script>
<style scoped>
</style>