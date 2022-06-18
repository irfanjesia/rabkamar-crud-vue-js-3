<template>
    <div class="container mt-5 text-center" v-if="!is_admin">
        Not Authorized<br>
        <button @click.prevent="logout" class="btn btn-sm btn-danger mt-3">LOGOUT</button>
    </div>
    <div class="container my-4" v-else>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h4>ORDER DATA</h4>
                            </div>
                            <div class="col">
                                <button @click.prevent="logout" class="btn btn-md btn-dark float-end">LOGOUT</button>
                            </div>
                        </div>
                        <hr>
                        <router-link :to="{ name: 'order.create' }" class="btn btn-md btn-success">
                            CREATE NEW ORDER
                        </router-link>
                        <table class="table table-hover mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAMA PEMESAN</th>
                                    <th scope="col">TIPE KAMAR</th>
                                    <th scope="col">TANGGAL MASUK</th>
                                    <th scope="col">TANGGAL KELUAR</th>
                                    <th scope="col">JUMLAH ORANG</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orders" :key="order.id">
                                    <td>{{ order.id }}</td>
                                    <td>{{ order.user_name }}</td>
                                    <td>{{ order.kamar_id }}</td>
                                    <td>{{ order.tanggal_masuk }}</td>
                                    <td>{{ order.tanggal_keluar }}</td>
                                    <td>{{ order.jumlah_orang }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'order.edit', params: { id: order.id } }"
                                            class="btn btn-sm btn-primary m-1">
                                            UPDATE
                                        </router-link>
                                        <button @click.prevent="orderDelete(order.id)"
                                            class="btn btn-sm btn-danger m-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'OrderView',

    data() {
        return {
            loggedIn: localStorage.getItem('loggedIn'),
            token: localStorage.getItem('token'),
            user: [],
            is_admin: false,
            orders: []
        }
    },

    created() {
        axios.get('http://rabkamar.test/api/user', { headers: { 'Authorization': 'Bearer ' + this.token } })
            .then(response => {
                console.log(response)
                this.user = response.data //assign response to state user
                this.is_admin = response.data.is_admin //get is_admin
            })
        axios.get('http://rabkamar.test/api/order', { headers: { 'Authorization': 'Bearer ' + this.token } })
            .then(response => {
                this.orders = response.data //assign response to orders
            }).catch(error => {
                console.log(error.response.data)
            })
    },

    methods: {
        logout() {
            axios.post('http://rabkamar.test/api/logout')
                .then(() => {
                    localStorage.removeItem("loggedIn")
                    return this.$router.push({ name: 'order.index' })
                })
        },
        orderDelete(id) {
            if (confirm('Are you sure you want to delete this order?')) {
                axios.delete(`http://rabkamar.test/api/order/${id}`, { headers: { 'Authorization': 'Bearer ' + this.token } })
                    .then(() => {
                        const index = this.orders.findIndex(order => order.id === id)
                        if (~index) {
                            this.orders.splice(index, 1)
                        }
                    }).catch(error => {
                        console.log(error.response.data)
                    })
            } else {
                return false;
            }
        }
    },

    mounted() {
        if (!this.loggedIn) {
            return this.$router.push({ name: 'order.index' })
        }
    }
}
</script>

<style>
body {
    background-color: #FAFAFA
}
</style>