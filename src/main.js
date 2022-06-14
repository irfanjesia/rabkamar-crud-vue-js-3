import {createApp} from 'vue';
import App from './App.vue';

//import router
import router from './router/index';

//import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min';

//import axios
import axios from 'axios';

//set credential axios with true
axios.defaults.withCredentials = true;

const app = createApp (App);

//use vue router
app.use (router);

app.mount ('#app');
