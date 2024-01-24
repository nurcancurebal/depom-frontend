import { createRouter, createWebHistory } from 'vue-router'
import Stock from "@/views/Stock"
import Entry from "@/views/Entry"
import Checkout from "@/views/Checkout"
import Current from "@/views/Current"

const routes = [
  {
    path: '/stock',
    name: 'Stock',
    component: Stock
  },
  {
    path: '/entry',
    name: 'Entry',
    component: Entry
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/Current',
    name: 'Current',
    component: Current
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router