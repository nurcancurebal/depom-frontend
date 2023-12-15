import { createRouter, createWebHistory } from 'vue-router'
import DepoStok from "@/views/DepoStok"
import StokGiris from "@/views/StokGiris"
import StokCikis from "@/views/StokCikis"
import Cari from "@/views/Cari"

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
  {
    path: '/cari',
    name: 'Cari',
    component: Cari
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router