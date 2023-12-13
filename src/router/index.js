import { createRouter, createWebHistory } from 'vue-router'
import DepoStok from "@/views/DepoStok"
import StokGiris from "@/views/StokGiris"
import StokCikis from "@/views/StokCikis"

const routes = [
  {
    path: '/depostok',
    name: 'DepoStok',
    component: DepoStok
  },
  {
    path: '/stokgiris',
    name: 'StokGiris',
    component: StokGiris
  },
  {
    path: '/stokcikis',
    name: 'StokCikis',
    component: StokCikis
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router