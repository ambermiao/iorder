<template>
    <div class="order">
        <h3 class="mb-4">個人檔案</h3>
        <form @submit.prevent="save" v-if="getmember">
            <div class="row">
                <div class="col col-lg-6 form-group">
                    <label>姓名</label>
                    <input type="text" class="form-control" placeholder="name" v-model="getmember.name">
                </div>
                <div class="col col-lg-6 form-group">
                    <label>電話</label>
                    <input type="text" class="form-control" placeholder="phone" v-model="getmember.phone">
                </div>
                
            </div>
            <div class="form-group">
                <label>電子郵件</label>
                <input type="email" class="form-control" placeholder="E-mail" v-model="getmember.email">
            </div>
            <button type="submit" class="btn-sm btn-primary float-right">儲存</button>
        </form>
    </div>
</template>
<script>
    export default {
        name: 'Info',
        data() {
            return {
                member:{}
            }
        },
        computed: {
            getmember(){
                const getmember = this.$store.state.member
                this.member = getmember
                return this.member
            }
        },
        methods: {
            save(){
                const ary_id = this.member.id - 1
                this.axios.post('/member/'+ary_id,this.member,{headers: {'Content-Type': 'application/json'}}).then((response)=>{
                })
            }
        }
    }
</script>