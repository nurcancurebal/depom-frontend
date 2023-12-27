<template>
  <v-card style="margin: 40px; padding: 40px">
    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Stok Kodu/Barkod:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Ürün Adı:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Tarih:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field
          variant="outlined"
          @click="datePickers = !datePickers"
          v-show="!datePickers"
        />

        <v-date-picker
          show-adjacent-months
          @click="datePickers = !datePickers"
          v-show="datePickers"
        />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Kategori:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Tedarikçi:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Marka:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Model:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Miktar:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Birim:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Birim Fiyat:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      datePickers: false,
    };
  },
};
</script>


<style>
.v-picker__header,
.v-picker-title,
.v-input__details {
  display: none !important;
}
</style>