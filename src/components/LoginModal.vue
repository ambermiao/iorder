<template>
    <div class="modal fade" id="loginModal" ref="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content" v-if="!is_register">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginModalLabel">會員登入</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert" v-show="is_login == false">
                        輸入的電子郵件或密碼不正確
                    </div>
                    <form @submit.prevent="loginAction">
                        <div class="form-group">
                            <label>電子郵件</label>
                            <input type="email" name="email" class="form-control"
                                placeholder="Email" v-model.trim="login.email">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">密碼</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                                v-model.trim="login.password">
                        </div>
                        <button type="submit" class="btn btn-primary w-100 mt-4">
                        <span v-show="!login_loading">登入</span>
                        <clip-loader :loading="login_loading" :color="'#fff'" :size="'1rem'"></clip-loader>
                        </button>
                        
                        <p class="text-center mt-4 text-muted">尚未設立帳戶？ <a class="text-primary" @click="is_register = true">免費註冊</a></p>
                    </form>
                </div>
            </div>
            <div class="modal-content" v-else>
                <div class="modal-header">
                    <h5 class="modal-title" id="loginModalLabel">會員註冊</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert" v-show="is_email">
                        輸入的電子郵件已經被註冊
                    </div>
                    <form @submit.prevent="registerAction" data-vv-scope="register-form">
                        <div class="form-group">
                            <label for="name">姓名</label>
                            <input type="text" class="form-control" name="姓名" placeholder="Name" 
                            :class="{ 'is-validated': errors.has('register-form.姓名') }" v-validate="'required'" v-model="register.name">
                            <small class="form-text text-danger" v-show="errors.has('register-form.姓名')">{{ errors.first('register-form.姓名') }}</small>
                        </div>
                        <div class="form-group">
                            <label>電子郵件</label>
                            <input type="email" class="form-control" name="email"
                                :class="{ 'is-validated': errors.has('register-form.email') }" v-validate="'required|email'" placeholder="Email" v-model="register.email">
                            <small class="form-text text-danger" v-show="errors.has('register-form.email')">{{ errors.first('register-form.email') }}</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">密碼</label>
                            <input type="password" name="密碼" class="form-control" id="exampleInputPassword1" placeholder="Password"
                                :class="{ 'is-validated': errors.has('register-form.密碼') }" v-validate="'required|alpha_num'" v-model="register.password">
                            <small class="form-text text-danger" v-show="errors.has('register-form.密碼')">{{ errors.first('register-form.密碼') }}</small>
                        </div>
                        <div class="form-group">
                            <label for="phone">手機號碼</label>
                            <input type="text" name="手機號碼"  class="form-control" id="phone" placeholder="Phone" 
                            :class="{ 'is-validated': errors.has('register-form.手機號碼') }" v-validate="{ required: true, regex: /^09\d{8}$/ }" v-model="register.phone">
                            <small class="form-text text-danger" v-show="errors.has('register-form.手機號碼')">{{ errors.first('register-form.手機號碼') }}</small>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 mt-4">
                            <span v-show="!register_loading">註冊</span>
                            <clip-loader :loading="register_loading" :color="'#fff'" :size="'1rem'"></clip-loader>
                        </button>
                        <p class="text-center mt-4 text-muted">已有帳戶? <a class="text-primary" @click="is_register = false">登入</a></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
    export default {
        name: 'LoginModal',
        components: {
            ClipLoader
        },
        data() {
            return {
                is_register: false,
                is_login: true,
                is_email: false,
                login: {
                    email: '',
                    password: ''
                },
                register: {
                    name: '',
                    email: '',
                    password: '',
                    phone: ''
                },
                login_loading: false,
                register_loading: false
            }
        },
        methods: {
            loginAction() {
                this.login_loading = true
                this.$store.dispatch('login', this.login).then(() => {
                this.$nextTick(() => {
                    this.login_loading = false
                    $('#loginModal').modal('hide')
                })
                this.$router.go(0)
                }).catch(() => {
                    this.login_loading = false
                    this.is_login = false
                    this.login.email = ''
                    this.login.password = ''
                })
            },
            registerAction() {
                this.$validator.validateAll('register-form').then((result) => {
                    if (result) {
                        this.register_loading = true
                        this.$store.dispatch('register', this.register).then(() => {
                            this.$nextTick(() => {
                                this.register_loading = false
                                $('#loginModal').modal('hide')
                            })
                            this.$router.go(0)
                        }).catch(() => {
                            this.register_loading = false
                            this.is_email = true
                            this.register.email = ''
                            this.register.password = ''
                            this.register.name = ''
                            this.register.phone = ''
                        })
                    }
                });
                
            }
        }
    }
</script>