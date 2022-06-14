<template>
    <div class="container mt-5 text-center" v-if="!is_admin">
        Not Authorized<br>
        <button @click.prevent="logout" class="btn btn-sm btn-danger mt-3">LOGOUT</button>
    </div>
    <div class="container mt-5" v-else>
        <div class="row">
            <div class="col-md-10 ms-auto me-auto">
                <div class="card">
                    <div class="card-body">
                        <h4>CREATE NEW ORDER</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group my-3">
                                <label for="user_name" class="font-weight-bold">Nama Pemesan</label>
                                <input type="text" class="form-control" v-model="order.user_name"
                                    placeholder="Masukkan Nama Pemesan" required>
                                <!-- validation -->
                                <div v-if="validation.user_name" class="mt-2 alert alert-danger">
                                    Isi nama pemesan
                                </div>
                            </div>
                            <div class="form-group my-3">
                                <label for="kamar_id" class="font-weight-bold">Tipe Kamar</label>
                                <input type="number" class="form-control" v-model="order.kamar_id"
                                    placeholder="Masukkan Tipe Kamar" required>
                                <!-- validation -->
                                <div v-if="validation.kamar_id" class="mt-2 alert alert-danger">
                                    Isi tipe kamar
                                </div>
                            </div>
                            <div class="form-group my-3">
                                <label for="tanggal_masuk" class="font-weight-bold">Tanggal Masuk</label>
                                <input type="date" class="form-control" v-model="order.tanggal_masuk" required>
                                <!-- validation -->
                                <div v-if="validation.tanggal_masuk" class="mt-2 alert alert-danger">
                                    Isi tanggal masuk
                                </div>
                            </div>
                            <div class="form-group my-3">
                                <label for="tanggal_keluar" class="font-weight-bold">Tanggal Keluar</label>
                                <input type="date" class="form-control" v-model="order.tanggal_keluar" required>
                                <!-- validation -->
                                <div v-if="validation.tanggal_keluar" class="mt-2 alert alert-danger">
                                    Isi tanggal keluar
                                </div>
                            </div>
                            <div class="form-group my-3">
                                <label for="jumlah_orang" class="font-weight-bold">Jumlah Orang</label>
                                <input type="number" class="form-control" v-model="order.jumlah_orang"
                                    placeholder="Masukkan Jumlah Orang" required>
                                <!-- validation -->
                                <div v-if="validation.jumlah_orang" class="mt-2 alert alert-danger">
                                    Isi jumlah orang
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary mt-2">SIMPAN</button>
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
    name: 'OrderCreate',

    data() {
        return {
            loggedIn: localStorage.getItem('loggedIn'),
            token: localStorage.getItem('token'),
            user: [],
            order: [],
            user_id: 0,
            is_admin: false,
            validation: [],
        }
    },

    created() {
        axios.get('http://rabkamar.test/api/user', { headers: { 'Authorization': 'Bearer ' + this.token } })
            .then(response => {
                console.log(response)
                this.user = response.data //assign response to state user
                this.user_id = response.data.id //get user_id
                this.is_admin = response.data.is_admin //get is_admin
            })
    },

    methods: {
        store() {
            axios.post('http://rabkamar.test/api/order', {
                user_id: this.user_id,
                user_name: this.order.user_name,
                kamar_id: this.order.kamar_id,
                tanggal_masuk: this.order.tanggal_masuk,
                tanggal_keluar: this.order.tanggal_keluar,
                jumlah_orang: this.order.jumlah_orang
            }).then(() => {
                this.$router.push({
                    name: 'order.view'
                })
            }).catch(error => {
                console.log(error.response.data)
            })
            this.validation = []
            if (!this.order.user_name) {
                this.validation.user_name = true
            }
            if (!this.order.kamar_id) {
                this.validation.kamar_id = true
            }
            if (!this.order.tanggal_masuk) {
                this.validation.tanggal_masuk = true
            }
            if (!this.order.tanggal_keluar) {
                this.validation.tanggal_keluar = true
            }
            if (!this.order.jumlah_orang) {
                this.validation.jumlah_orang = true
            }
        },
        logout() {
            axios.post('http://rabkamar.test/api/logout')
                .then(() => {
                    localStorage.removeItem("loggedIn")
                    return this.$router.push({ name: 'order.index' })
                })
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