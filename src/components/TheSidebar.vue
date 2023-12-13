<template>
  <v-card style="border-radius: unset">
    <v-layout>
      <v-navigation-drawer
        floating
        permanent
        style="position: absolute; width: 100%; background-color: #ededed"
      >
        <v-list density="compact" nav style="font-size: 1.4rem">
          <v-list-item
            prepend-icon="mdi-warehouse"
            title="Depo - Stok"
            value="depostok"
          />
          <v-list-item
            prepend-icon="mdi-archive-plus"
            title="Stok Giriş"
            value="stokgiris"
          />
          <v-list-item
            prepend-icon="mdi-archive-minus"
            title="Stok Çıkış"
            value="stokcikis"
          />
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 155px" />
    </v-layout>
  </v-card>
</template>