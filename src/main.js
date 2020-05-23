import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Notes from "@/components/Notes.vue";
import ChangeNote from "@/components/ChangeNote.vue";

Vue.use(VueRouter)

//маршрутизация по страницам
const routes = [
  { path: '/', name: "Notes", component: Notes },
  { path: '/change/:id', name: "ChangeNote", component: ChangeNote, },
  { path: '*', name: "NotFound", component: Notes },
]

const router = new VueRouter({
  mode: 'history',
  routes
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
