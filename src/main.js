import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import UUID from "vue-uuid";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import DashBoard from './components/DashBoard.vue'
import Login from './components/Login.vue'
import Bank from './components/Bank.vue'
import Employee from './components/Employee.vue'
import Salary from './components/Salary.vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(UUID);
Vue.use(VueRouter)
const routes = [
  { path: '/dashboard', component: DashBoard },
  { path: '/login', component: Login },
  { path: '/bank', component: Bank },
  { path: '/employee', component: Employee },
  { path: '/salary', component: Salary },
];
const router = new VueRouter({
  routes,
  mode:'history'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App,DashBoard),
  router,
}).$mount('#app')
