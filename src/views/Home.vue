<template>
  <v-row
    align="center"
    style="height: 563px; background-color: #ededed"
    justify="center"
  >
    <v-col cols="4" style="padding: 0">
      <v-sheet
        :elevation="13"
        :height="400"
        style="border-radius: 25px 0px 0px 25px"
        class="text-center py-15"
      >
        <h2 class="text-h3 font-weight-bold" style="color: #208ec6">Depom</h2>
        <p class="my-4 text-medium-emphasis text-body-1 text-center">
          Stok takip ve yönetim uygulaması
        </p>
        <div
          style="text-align: left; display: inline-block"
          class="text-medium-emphasis"
        >
          <ul style="list-style-type: disc">
            <li>Depo - Stok</li>
            <li>Stok Giriş</li>
            <li>Stok Çıkış</li>
            <li>Cari</li>
          </ul>
        </div>
      </v-sheet>
    </v-col>
    <v-col cols="5" style="padding: 0">
      <v-sheet
        :elevation="13"
        :height="400"
        style="border-radius: 0px 25px 25px 0px"
      ></v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
</style>