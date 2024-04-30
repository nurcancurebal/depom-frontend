<template>
  <v-card style="border-radius: unset">
    <v-layout>
      <v-app-bar style="color: white; background-color: #208ec6" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />

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

        <template v-if="$vuetify.display.mdAndUp">
          <v-toolbar-items style="align-items: center">
            {{ user.firstname }} {{ user.lastname }}
          </v-toolbar-items>

          <v-btn icon>
            <v-icon icon="mdi-account"></v-icon>
            <v-menu activator="parent">
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    <router-link
                      style="
                        text-decoration: none;
                        color: #208ec6;
                        font-family: 'Material Design Icons';
                      "
                      to="/update-account"
                      class="pa-2"
                    >
                      Hesabımı Düzenle
                    </router-link>
                  </v-list-item-title>
                  <v-list-item-title>
                    <router-link
                      style="
                        text-decoration: none;
                        color: #208ec6;
                        font-family: 'Material Design Icons';
                      "
                      to="/"
                      class="pa-2"
                    >
                      Çıkış
                    </router-link>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </template>
        <v-btn icon="mdi-dots-vertical" @click.stop="drawer = !drawer" />
      </v-app-bar>

      <v-navigation-drawer
        floating
        permanent
        style="position: absolute; background-color: #ededed"
        v-model="drawer"
      >
        <router-link
          to="/stock"
          style="
            text-decoration: none;
            display: flex;
            align-items: center;
            color: #424242;
          "
          class="ma-1 pa-2 my-3"
        >
          <v-icon size="20">mdi-warehouse</v-icon>
          <v-list-item-title
            value="depostok"
            style="font-size: 20px; margin-left: 10px"
          >
            Depo - Stok
          </v-list-item-title>
        </router-link>

        <router-link
          to="/entry"
          style="
            text-decoration: none;
            display: flex;
            align-items: center;
            color: #424242;
          "
          class="ma-1 pa-2 my-3"
        >
          <v-icon size="20">mdi-archive-plus</v-icon>
          <v-list-item-title
            value="stokgiris"
            style="font-size: 20px; margin-left: 10px"
          >
            Stok Giriş
          </v-list-item-title>
        </router-link>

        <router-link
          to="/checkout"
          style="
            text-decoration: none;
            display: flex;
            align-items: center;
            color: #424242;
          "
          class="ma-1 pa-2 my-3"
        >
          <v-icon size="20">mdi-archive-minus</v-icon>
          <v-list-item-title
            value="stokcikis"
            style="font-size: 20px; margin-left: 10px"
          >
            Stok Çıkış
          </v-list-item-title>
        </router-link>

        <router-link
          to="/current"
          style="
            text-decoration: none;
            display: flex;
            align-items: center;
            color: #424242;
          "
          class="ma-1 pa-2 my-3"
        >
          <v-icon size="20">mdi-calculator-variant</v-icon>
          <v-list-item-title
            value="cari"
            style="font-size: 20px; margin-left: 10px"
          >
            Cari
          </v-list-item-title>
        </router-link>

        <template v-slot:append>
          <router-link
            to="/settings"
            style="
              text-decoration: none;
              display: flex;
              align-items: center;
              color: #424242;
            "
            class="ma-1 pa-2 my-3"
          >
            <v-icon size="20">mdi-cog</v-icon>
            <v-list-item-title
              value="settings"
              style="font-size: 20px; margin-left: 10px"
            >
              Ayarlar
            </v-list-item-title>
          </router-link>

          <router-link
            to="/"
            style="
              text-decoration: none;
              display: flex;
              align-items: center;
              color: #424242;
            "
            class="ma-1 pa-2 my-3"
          >
            <v-icon size="20">mdi-exit-to-app</v-icon>
            <v-list-item-title
              value="cikis"
              style="font-size: 20px; margin-left: 10px"
            >
              Çıkış
            </v-list-item-title>
          </router-link>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {
    group() {
      this.drawer = false;
    },
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
  background-color: #f5f5f5;
}
#title:hover {
  background-color: #208ec6;
}
</style>