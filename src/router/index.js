import { createRouter, createWebHistory } from 'vue-router'
import Stock from "@/views/Stock"
import Entry from "@/views/Entry"
import Checkout from "@/views/Checkout"
import Current from "@/views/Current"
import Home from "@/views/Home"
import UpdateAccount from "@/views/UpdateAccount"
import Settings from "@/views/Settings"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Giriş Yap',
    },
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock,
    meta: {
      title: 'Depo - Stok',
    },
  },
  {
    path: '/entry',
    name: 'Entry',
    component: Entry,
    meta: {
      title: 'Stok Giriş',
    },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      title: 'Stok Çıkış',
    },
  },
  {
    path: '/Current',
    name: 'Current',
    component: Current,
    meta: {
      title: 'Cari Hesaplar',
    },
  },
  {
    path: '/update-account',
    name: 'UpdateAccount',
    component: UpdateAccount,
    meta: {
      title: 'Hesabımı Düzenle',
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: 'Ayarlar',
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `Depom - ${to.meta.title || 'Default Title'}`;
  next();
});


const token = localStorage.getItem("token");
const navPathName = location.pathname;

const WHITE_NONTOKEN_PATH_NAMES = "/";

if (!WHITE_NONTOKEN_PATH_NAMES.includes(navPathName) && !token) {
  router.push("/");
};

if (WHITE_NONTOKEN_PATH_NAMES.includes(navPathName) && token) {
  localStorage.removeItem("token");
};

export default router