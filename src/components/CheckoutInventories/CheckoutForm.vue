<template>
  <v-card class="w-100 my-5 pa-11" v-show="showCheckoutInventory">
    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Stok Kodu / Barkod:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="10" class="pa-0">
        <v-text-field variant="outlined" required disabled>
          {{ barcode_data }}
        </v-text-field>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Ürün Adı:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="10" class="pa-0">
        <v-text-field variant="outlined" required disabled>
          {{ productname_data }}
        </v-text-field>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Kategori:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="10" class="pa-0">
        <v-text-field variant="outlined" required disabled>
          {{ category_data }}
        </v-text-field>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Alt Kategori:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="10" class="pa-0">
        <v-text-field variant="outlined" required disabled>
          {{ subCategory_data }}
        </v-text-field>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Tedarikçi:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="10" class="pa-0">
        <v-text-field variant="outlined" required disabled>
          {{ supplier_data }}
        </v-text-field>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Marka:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="4" class="pa-0">
        <v-text-field variant="outlined" required disabled>
          {{ brand_data }}
        </v-text-field>
      </v-col>
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader
          style="padding-inline-end: 0"
          class="subheader-margin"
        >
          Birim:
        </v-list-subheader>
      </v-col>
      <v-col cols="12" md="4" class="pa-0">
        <v-select
          clearable
          variant="outlined"
          v-model="unit"
          :items="unitItems_data"
          required
          :rules="[() => !!unit || 'Birim boş bırakılamaz.']"
          :disabled="unitDisabled"
        />
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Toplam Miktar:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="4" class="pa-0">
        <v-text-field
          variant="outlined"
          v-model="quantity"
          required
          :disabled="quantityDisabled"
        />
      </v-col>
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader
          style="padding-inline-end: 0"
          class="subheader-margin"
        >
          Toplam Birim Fiyat:
        </v-list-subheader>
      </v-col>
      <v-col cols="12" md="4" class="pa-0">
        <v-text-field
          variant="outlined"
          v-model="unitprice"
          required
          :disabled="unitpriceDisabled"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="5"
        offset="7"
        sm="3"
        offset-sm="9"
        md="2"
        offset-md="10"
        class="col-padding"
      >
        <v-btn
          :style="{
            'background-color': allTrueDisabled ? '#00c853' : '#ededed',
            'font-family': 'auto',
            width: '100%',
          }"
          :disabled="!allTrueDisabled"
          @click="emitOpen"
        >
          Çıkış Yap
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    showCheckoutInventory: Boolean,
    barcode_data: String,
    productname_data: String,
    category_data: String,
    subCategory_data: String,
    supplier_data: String,
    brand_data: String,
    unitItems_data: Array,
  },

  data() {
    return {
      unit: "",
      unitDisabled: false,
      unitpriceDisabled: false,
      unitprice: "",
      quantity: "",
      quantityDisabled: false,
      overlayOpen: false,
    };
  },

  computed: {
    allTrueDisabled() {
      return (
        this.barcode_data !== "" &&
        this.productname_data !== "" &&
        this.category_data !== "" &&
        this.subCategory_data !== "" &&
        this.brand_data !== "" &&
        this.supplier_data !== "" &&
        this.unit !== "" &&
        this.quantity !== "" &&
        this.unitprice !== ""
      );
    },
  },

  watch: {
    unit(value) {
      if (value !== "") {
        this.unitDisabled = !this.unitDisabled;
        this.getListBarcode({ barcode: this.barcode_data }).then((result) => {
          const unitFilter = result.data.filter(
            (currentValue) => currentValue.unit === value
          );

          if (unitFilter.length > 1) {
            const entryFilterReduce = unitFilter
              .filter(({ process }) => process === "entry")
              .reduce((a, { quantity }) => a + quantity, 0);

            const unitpriceFilter = unitFilter
              .filter(({ process }) => process === "entry")
              .map(({ unitprice }) => unitprice);
            const reduce = unitpriceFilter.reduce((a, b) => a + b);
            this.unitprice = reduce / unitpriceFilter.length;
            this.unitpriceDisabled = !this.unitpriceDisabled;

            const checkoutFilterReduce = unitFilter
              .filter(({ process }) => process == "checkout")
              .reduce((a, { quantity }) => a + quantity, 0);

            this.quantity = entryFilterReduce - checkoutFilterReduce;
            this.$emit("update:quantityData", this.quantity);
            this.quantityDisabled = !this.quantityDisabled;
          } else {
            this.quantity = unitFilter[0].quantity;
            this.$emit("update:quantityData", this.quantity);
            this.quantityDisabled = !this.quantityDisabled;
            this.unitprice = unitFilter[0].unitprice;
            this.unitpriceDisabled = !this.unitpriceDisabled;
          }
        });
      }
      return;
    },
  },
  methods: {
    ...mapActions("inventory", ["getListBarcode"]),
    emitOpen() {
      this.overlayOpen = !this.overlayOpen;
      this.$emit("update:openOverlayData", this.overlayOpen);
    },
  },
};
</script>

<style>
</style>