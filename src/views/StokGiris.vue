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
          v-model="dateFormat"
          v-show="!datePickers"
        />

        <v-date-picker
          show-adjacent-months
          v-model="date"
          v-show="datePickers"
        />

        <v-btn
          :disabled="loading"
          style="margin: 0 24px; width: 316px; min-width: 316px"
          plain
          @click="dateClose"
          v-show="datePickers"
        >
          Kapat
        </v-btn>
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Kategori:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-select clearable :items="items" variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Alt Kategori:
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
      date: null,
      dateFormat: null,
      datePickers: false,
      items: [
        "Meyve & Sebze",
        "Et & Balık",
        "Kahvaltılık & Süt Ürünleri",
        "Temel Gıda",
        "Hazır Yemek & Donuk",
        "İçecek",
        "Dondurma",
        "Atıştırmalık",
        "Fırın & Pastane",
        "Deterjan & Temizlik",
        "Kağıt Ürünleri",
        "Kişisel Bakım &  Sağlık",
        "Bebek",
        "Ev & Yaşam",
        "Kırtasiye & Oyuncak",
        "Çiçek",
        "Pet Shop",
        "Elektronik",
      ],
    };
  },
  watch: {
    date: function (date) {
      this.dateFormat = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`;
    },
  },
  methods: {
    dateClose() {
      this.datePickers = !this.datePickers;
    },
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