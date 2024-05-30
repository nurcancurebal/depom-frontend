<template>
  <v-navigation-drawer
    v-if="$route.name !== 'UserAuth'"
    floating
    style="background-color: #ededed"
    :modelValue="drawer"
  >
    <router-link to="/stock" class="router-link">
      <v-icon size="21">mdi-warehouse</v-icon>
      <v-list-item-title value="depostok" class="a-list-item-title">
        Depo - Stok
      </v-list-item-title>
    </router-link>

    <router-link to="/entry" class="router-link">
      <v-icon size="21">mdi-archive-plus</v-icon>
      <v-list-item-title value="stokgiris" class="a-list-item-title">
        Stok Giriş
      </v-list-item-title>
    </router-link>

    <router-link to="/checkout" class="router-link">
      <v-icon size="21">mdi-archive-minus</v-icon>
      <v-list-item-title value="stokcikis" class="a-list-item-title">
        Stok Çıkış
      </v-list-item-title>
    </router-link>

    <router-link to="/current" class="router-link">
      <v-icon size="21">mdi-calculator-variant</v-icon>
      <v-list-item-title value="cari" class="a-list-item-title">
        Cari
      </v-list-item-title>
    </router-link>

    <template v-slot:append>
      <router-link
        to="/update-account"
        class="router-link"
        v-if="$vuetify.display.mdAndDown"
      >
        <v-icon size="21">mdi-account</v-icon>
        <v-list-item-title value="hesabimiduzenle" class="a-list-item-title">
          Hesabımı Düzenle
        </v-list-item-title>
      </router-link>

      <router-link to="/settings" class="router-link">
        <v-icon size="21">mdi-cog</v-icon>
        <v-list-item-title value="settings" class="a-list-item-title">
          Ayarlar
        </v-list-item-title>
      </router-link>

      <router-link to="/" class="router-link" @click="exitToast">
        <v-icon size="21">mdi-exit-to-app</v-icon>
        <v-list-item-title value="cikis" class="a-list-item-title">
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