<template>
    <div class="container" style="margin-top:100px">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div v-if="loginFailed" class="alert alert-danger">
                    Invalid email or password
                </div>
                <div class="card">
                    <div class="card-body">
                        <h3 class="mb-4">Rabkamar API</h3>
                        <form @submit.prevent="login">
                            <div class="mb-3">
                                <label class="form-label">Email address</label>
                                <input type="email" class="form-control" v-model="user.email" placeholder="Email"
                                    required autofocus>
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    Enter your email
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control" v-model="user.password"
                                    placeholder="Password" required>
                                <!-- validation -->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    Enter your password
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'OrderIndex',

    data() {
        return {
            loggedIn: localStorage.getItem('loggedIn'),
            token: localStorage.getItem('token'),
            user: [],
            validation: [],
            is_admin: false,
            loginFailed: null
        }
    },

    methods: {
        login() {
            if (this.user.email && this.user.password) {
                axios.get('http://rabkamar.test/sanctum/csrf-cookie')
                    .then(response => {
                        //debug cookie
                        console.log(response)
                        this.is_admin = response.data.is_admin //get is_admin
                        axios.post('http://rabkamar.test/api/login', {
                            email: this.user.email,
                            password: this.user.password
                        }).then(res => {
                            console.log(res)
                            if (res.data.success) {
                                localStorage.setItem("loggedIn", "true")
                                localStorage.setItem("token", res.data.token)
                                this.loggedIn = true
                                return this.$router.push({ name: 'order.view' })
                            } else {
                                this.loginFailed = true
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                    })
            }
            this.validation = []
            if (!this.user.email) {
                this.validation.email = true
            }
            if (!this.user.password) {
                this.validation.password = true
            }
        }
    },

    mounted() {
        if (this.loggedIn) {
            return this.$router.push({ name: 'order.view' })
        }
    }
}
</script>

<style>
body {
    background-color: #FAFAFA
}
</style>