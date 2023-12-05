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
            prepend-icon="mdi-truck"
            title="Depo -Stok"
            value="depostok"
          />
          <v-list-item prepend-icon="mdi-notebook" title="Cari" value="cari" />
          <v-list-item
            prepend-icon="mdi-account"
            title="Personel"
            value="personel"
          />
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 175px" />
    </v-layout>
  </v-card>
</template>