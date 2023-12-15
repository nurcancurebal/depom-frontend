<template>
  <v-card style="border-radius: unset">
    <v-layout>
      <v-navigation-drawer
        floating
        permanent
        style="position: absolute; width: 100%; background-color: #ededed"
      >
        <v-list density="compact" nav style="font-size: 1.4rem">
          <router-link
            to="/depostok"
            style="text-decoration: none; color: black"
          >
            <v-list-item
              prepend-icon="mdi-warehouse"
              title="Depo - Stok"
              value="depostok"
              class="mb-2"
            />
          </router-link>

          <router-link
            to="/stokgiris"
            style="text-decoration: none; color: black"
          >
            <v-list-item
              prepend-icon="mdi-archive-plus"
              title="Stok Giriş"
              value="stokgiris"
              class="mb-2"
            />
          </router-link>

          <router-link
            to="/stokcikis"
            style="text-decoration: none; color: black"
          >
            <v-list-item
              prepend-icon="mdi-archive-minus"
              title="Stok Çıkış"
              value="stokcikis"
              class="mb-2"
            />
          </router-link>

          <router-link to="/cari" style="text-decoration: none; color: black">
            <v-list-item
              prepend-icon="mdi-calculator-variant"
              title="Cari"
              value="cari"
              class="mb-2"
            />
          </router-link>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 215px" />
    </v-layout>
  </v-card>
</template>