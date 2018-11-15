<template>
    <div class="order">
        <h3 class="mb-4">個人檔案</h3>
        <form @submit.prevent="save" v-if="getmember">
            <div class="row">
                <div class="col col-lg-6 form-group">
                    <label>姓名</label>
                    <input type="text" class="form-control" name="姓名" placeholder="Name" :class="{ 'is-validated': errors.has('姓名') }"
                        v-validate="'required'" v-model="getmember.name">
                    <small class="form-text text-danger" v-show="errors.has('姓名')">{{
                        errors.first('姓名') }}</small>
                </div>
                <div class="col col-lg-6 form-group">
                    <label>手機號碼</label>
                    <input type="text" name="手機號碼" class="form-control" id="phone" placeholder="Phone" :class="{ 'is-validated': errors.has('手機號碼') }"
                        v-validate="{ required: true, regex: /^09\d{8}$/ }" v-model="getmember.phone">
                    <small class="form-text text-danger" v-show="errors.has('手機號碼')">{{
                        errors.first('手機號碼') }}</small>
                </div>

            </div>
            <div class="form-group">
                <label>電子郵件</label>
                <input type="email" class="form-control" name="email" :class="{ 'is-validated': errors.has('email') }"
                    v-validate="'required|email'" placeholder="Email" v-model="getmember.email">
                <small class="form-text text-danger" v-show="errors.has('email')">{{
                    errors.first('email') }}</small>
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
                member: {}
            }
        },
        computed: {
            getmember() {
                const getmember = this.$store.state.member
                this.member = getmember
                return this.member
            }
        },
        methods: {
            save() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        const ary_id = this.member.id - 1
                        this.axios.post('/member/' + ary_id, this.member, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then((response) => {})
                    }
                })
            }
        }
    }
</script>