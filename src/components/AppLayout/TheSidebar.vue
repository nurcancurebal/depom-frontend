<template>
  <v-navigation-drawer
    v-if="$route.name !== 'UserAuth'"
    floating
    style="background-color: #ededed"
    :modelValue="drawer"
    @update:modelValue="$emit('toggleDrawer')"
  >
    <router-link
      to="/dashboard"
      class="router-link"
      :class="{ 'active-link': $route.path === '/dashboard' }"
    >
      <v-icon size="21">mdi-chart-line</v-icon>
      <v-list-item-title value="dashboard" class="a-list-item-title">
        Ön İzleme
      </v-list-item-title>
    </router-link>

    <router-link
      to="/stock"
      class="router-link"
      :class="{ 'active-link': $route.path === '/stock' }"
    >
      <v-icon size="21">mdi-warehouse</v-icon>
      <v-list-item-title value="stock" class="a-list-item-title">
        Depo - Stok
      </v-list-item-title>
    </router-link>

    <router-link
      to="/entry"
      class="router-link"
      :class="{ 'active-link': $route.path === '/entry' }"
    >
      <v-icon size="21">mdi-archive-plus</v-icon>
      <v-list-item-title value="entry" class="a-list-item-title">
        Stok Giriş
      </v-list-item-title>
    </router-link>

    <router-link
      to="/checkout"
      class="router-link"
      :class="{ 'active-link': $route.path === '/checkout' }"
    >
      <v-icon size="21">mdi-archive-minus</v-icon>
      <v-list-item-title value="checkout" class="a-list-item-title">
        Stok Çıkış
      </v-list-item-title>
    </router-link>

    <router-link
      to="/current"
      class="router-link"
      :class="{ 'active-link': $route.path === '/current' }"
    >
      <v-icon size="21">mdi-calculator-variant</v-icon>
      <v-list-item-title value="current" class="a-list-item-title">
        Cari Hesaplar
      </v-list-item-title>
    </router-link>

    <template v-slot:append>
      <router-link
        to="/update-account"
        class="router-link"
        v-if="$vuetify.display.mdAndDown"
        :class="{ 'active-link': $route.path === '/update-account' }"
      >
        <v-icon size="21">mdi-account</v-icon>
        <v-list-item-title value="update-account" class="a-list-item-title">
          Hesabımı Düzenle
        </v-list-item-title>
      </router-link>

      <router-link
        to="/about-project"
        class="router-link"
        :class="{ 'active-link': $route.path === '/about-project' }"
      >
        <v-icon size="21">mdi-comment</v-icon>
        <v-list-item-title value="about-project" class="a-list-item-title">
          Proje Hakında
        </v-list-item-title>
      </router-link>

      <router-link
        to="/"
        class="router-link"
        @click="exitToast"
        :class="{ 'active-link': $route.path === '/' }"
      >
        <v-icon size="21">mdi-exit-to-app</v-icon>
        <v-list-item-title value="exit" class="a-list-item-title">
          Çıkış
        </v-list-item-title>
      </router-link>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { useToast } from "vue-toast-notification";

export default {
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    exitToast() {
      const toast = useToast();

      toast.success("Başarıyla çıkış yaptınız.", {
        position: "bottom",
        duration: 2000,
      });
    },
  },
};
</script>
<style>
.active-link {
  background-color: #d1cfcf;
}
</style>