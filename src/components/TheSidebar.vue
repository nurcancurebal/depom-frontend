<template>
  <v-card style="border-radius: unset; max-width: 200px">
    <v-layout>
      <v-navigation-drawer
        floating
        permanent
        style="position: absolute; width: 100%; background-color: #ededed"
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
      <v-main style="height: 92.5vh" />
    </v-layout>
  </v-card>
</template>

<style scoped>
a:hover {
  background-color: #b3aeaecf;
}
</style>