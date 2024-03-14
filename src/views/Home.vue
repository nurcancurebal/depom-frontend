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
        style="border-radius: 25px 0px 0px 25px; background-color: #208ec6"
        class="text-center py-15"
      >
        <h2 class="text-h3 font-weight-bold" style="color: #ededed">Depom</h2>
        <p class="my-4 text-body-1 text-center" style="color: #ededed">
          Stok takip ve yönetim uygulaması
        </p>
        <div style="text-align: left; display: inline-block">
          <ul style="list-style-type: disc; color: #ededed">
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
      >
        <form class="d-flex align-center flex-column justify-center pt-16">
          <v-text-field
            prepend-inner-icon="mdi-account"
            variant="solo"
            rounded="lg"
            style="width: 300px"
          />
          <v-text-field
            prepend-inner-icon="mdi-lock"
            variant="solo"
            style="width: 300px"
          />
          <v-btn
            class="mt-2"
            type="submit"
            style="
              color: #757575;
              width: 300px;
              background-color: #208ec6;
              color: #ededed;
            "
          >
            Giriş Yap
          </v-btn>
        </form>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>