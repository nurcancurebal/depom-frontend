<template>
  <v-app>
    <v-app-bar
      v-if="$route.name !== 'Home'"
      style="color: white; background-color: #208ec6"
      prominent
    >
      <img
        width="50"
        height="50"
        aspect-ratio="16/9"
        cover
        src="@/assets/logo.png"
        alt="logo"
        class="ml-4"
      />
      <v-toolbar-title class="text-h4">
        <router-link
          to="/stock"
          style="text-decoration: none; color: white"
          id="title"
        >
          Depom
        </router-link>
      </v-toolbar-title>

      <template v-if="$vuetify.display.lgAndUp">
        <v-toolbar-items style="align-items: center">
          {{ user.firstname }} {{ user.lastname }}
        </v-toolbar-items>

        <v-btn icon>
          <v-icon icon="mdi-account"></v-icon>
          <v-menu activator="parent">
            <v-list>
              <router-link
                style="
                  text-decoration: none;
                  color: #208ec6;
                  font-family: 'Material Design Icons';
                "
                to="/update-account"
              >
                <v-list-item-title value="hesabimiduzenle" class="pa-1 mx-2">
                  Hesabımı Düzenle
                </v-list-item-title>
              </router-link>

              <router-link
                style="
                  text-decoration: none;
                  color: #208ec6;
                  font-family: 'Material Design Icons';
                "
                to="/"
              >
                <v-list-item-title value="cikis" class="pa-1 mx-2">
                  Çıkış
                </v-list-item-title>
              </router-link>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
      <v-btn
        v-if="$vuetify.display.mdAndDown"
        icon="mdi-dots-vertical"
        @click.stop="drawer = !drawer"
      />
    </v-app-bar>

    <v-navigation-drawer
      v-if="$route.name !== 'Home'"
      floating
      style="background-color: #ededed"
      v-model="drawer"
    >
      <router-link to="/stock" class="router-link">
        <v-icon size="21">mdi-warehouse</v-icon>
        <v-list-item-title
          value="depostok"
          style="font-size: 20px; margin-left: 10px"
        >
          Depo - Stok
        </v-list-item-title>
      </router-link>

      <router-link to="/entry" class="router-link">
        <v-icon size="21">mdi-archive-plus</v-icon>
        <v-list-item-title
          value="stokgiris"
          style="font-size: 20px; margin-left: 10px"
        >
          Stok Giriş
        </v-list-item-title>
      </router-link>

      <router-link to="/checkout" class="router-link">
        <v-icon size="21">mdi-archive-minus</v-icon>
        <v-list-item-title
          value="stokcikis"
          style="font-size: 20px; margin-left: 10px"
        >
          Stok Çıkış
        </v-list-item-title>
      </router-link>

      <router-link to="/current" class="router-link">
        <v-icon size="21">mdi-calculator-variant</v-icon>
        <v-list-item-title
          value="cari"
          style="font-size: 20px; margin-left: 10px"
        >
          Cari
        </v-list-item-title>
      </router-link>

      <template v-slot:append>
        <router-link to="/settings" class="router-link">
          <v-icon size="21">mdi-cog</v-icon>
          <v-list-item-title
            value="settings"
            style="font-size: 20px; margin-left: 10px"
          >
            Ayarlar
          </v-list-item-title>
        </router-link>

        <router-link to="/" class="router-link">
          <v-icon size="21">mdi-exit-to-app</v-icon>
          <v-list-item-title
            value="cikis"
            style="font-size: 20px; margin-left: 10px"
          >
            Çıkış
          </v-list-item-title>
        </router-link>
      </template>
    </v-navigation-drawer>

    <v-main style="height: 200vh">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["getUser"]),
  },
  created() {
    this.getUser();
  },
};
</script>

<style>
.v-toolbar-title__placeholder {
  overflow: visible !important;
  font-family: "Material Design Icons" !important;
}
a:hover {
  background-color: #fdfcfcac;
}
#title:hover {
  background-color: #208ec6;
}
.router-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #424242;
  margin: 15px;
  padding: 13px;
  border-radius: 8px;
}
</style>