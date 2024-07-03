<template>
  <div class="my-8 ma-auto w-75">
    <h3 class="text-center">Ön İzleme</h3>
    <v-divider class="my-5 w-100" />
    <div class="d-flex flex-wrap justify-space-between display-align-column">
      <v-card class="pa-5 my-5" style="width: 200px">
        <div>Toplam Kar / Zarar</div>
        <h2 class="text-center">750</h2>
      </v-card>
      <v-card class="pa-5 my-5" style="width: 200px">
        <div>Toplam Stok Miktarı</div>
        <h2 class="text-center">750</h2>
      </v-card>
      <v-card class="pa-5 my-5" style="width: 200px">
        <div>Bugünkü İşlem Sayısı</div>
        <h2 class="text-center">750</h2>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@media (max-width: 575px) {
  .display-align-column {
    align-items: center !important;
    flex-direction: column !important;
  }
}
</style>