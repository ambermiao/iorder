<template>
    <div class="loginBox">
        <section class="content py-6">
            <div class="container">
                <h5 class="text-center text-black-50 mb-4">請先登入或註冊帳戶，前往付費</h5>
                <div class="modal-sm mx-auto">
                    <div class="modal-content" v-if="!is_register">
                        <div class="modal-header">
                            <h5 class="modal-title" id="loginModalLabel">會員登入</h5>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-danger" role="alert" v-show="is_login == false">
                                輸入的電子郵件或密碼不正確
                            </div>
                            <form @submit.prevent="loginAction">
                                <div class="form-group">
                                    <label for="loginEmail">電子郵件</label>
                                    <input type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp"
                                        placeholder="Email" v-model.trim="login.email">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">密碼</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                                        v-model.trim="login.password">
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mt-4">登入</button>
                                <p class="text-center mt-4 text-muted">尚未設立帳戶？ <a class="text-primary" @click="is_register = true">免費註冊</a></p>
                            </form>
                        </div>
                    </div>
                    <div class="modal-content" v-else>
                        <div class="modal-header">
                            <h5 class="modal-title" id="loginModalLabel">會員註冊</h5>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-danger" role="alert" v-show="is_email">
                                輸入的電子郵件已經被註冊
                            </div>
                            <form @submit.prevent="registerAction">
                                <div class="form-group">
                                    <label for="name">姓名</label>
                                    <input type="text" class="form-control" id="name" placeholder="Name" v-model="register.name">
                                </div>
                                <div class="form-group">
                                    <label for="registerEmail">電子郵件</label>
                                    <input type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp"
                                        placeholder="Email" v-model="register.email">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">密碼</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                                        v-model="register.password">
                                </div>
                                <div class="form-group">
                                    <label for="phone">手機號碼</label>
                                    <input type="text" class="form-control" id="phone" placeholder="Phone" v-model="register.phone">
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mt-4">註冊</button>
                                <p class="text-center mt-4 text-muted">已有帳戶? <a class="text-primary" @click="is_register = false">登入</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        name: 'Login',
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
                }
            }
        },
        methods: {
            loginAction() {
                this.$store.dispatch('login', this.login).then(() => {
                    this.$nextTick(() => {
                        this.$router.push({name:'payment'})
                    })
                }).catch(() => {
                    this.is_login = false
                    this.login.email = ''
                    this.login.password = ''
                })
            },
            registerAction() {
                this.$store.dispatch('register', this.register).then(() => {
                    this.$router.push({name:'payment'})
                }).catch(() => {
                    this.is_email = true
                    this.register.email = ''
                    this.register.password = ''
                    this.register.name = ''
                    this.register.phone = ''
                })
            }
        }
    }
</script>