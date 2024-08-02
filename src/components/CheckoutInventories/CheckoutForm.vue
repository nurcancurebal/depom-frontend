<template>
  <v-card class="w-100 my-5 pa-11" v-if="showCheckoutInventory">
    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Stok Kodu / Barkod:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="10" class="pa-0">
        <v-text-field
          variant="outlined"
          :value="barcodeData"
          required
          disabled
        />
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Ürün Adı:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="10" class="pa-0">
        <v-text-field
          variant="outlined"
          :value="productnameData"
          required
          disabled
        />
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Kategori:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="10" class="pa-0">
        <v-text-field
          variant="outlined"
          :value="categoryData"
          required
          disabled
        />
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Alt Kategori:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="10" class="pa-0">
        <v-text-field
          variant="outlined"
          :value="subCategoryData"
          required
          disabled
        />
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Tedarikçi:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="10" class="pa-0">
        <v-text-field
          variant="outlined"
          :value="supplierData"
          required
          disabled
        />
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" md="2" class="col-padding">
        <v-list-subheader style="padding-inline-end: 0">
          Marka:
        </v-list-subheader>
      </v-col>

      <v-col cols="12" md="4" class="pa-0">
        <v-text-field variant="outlined" :value="brandData" required disabled />
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
          :items="unitItemsData"
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
            'background-color': allFieldsFilled ? '#00c853' : '#ededed',
            'font-family': 'auto',
            width: '100%',
          }"
          :disabled="!allFieldsFilled"
          @click="$emit('update:unitData', this.unit)"
        >
          Çıkış Yap
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toast-notification";

export default {
  props: {
    showCheckoutInventory: Boolean,
    barcodeData: String,
    productnameData: String,
    categoryData: String,
    subCategoryData: String,
    supplierData: String,
    brandData: String,
    unitItemsData: Array,
    successCheckoutProps: Boolean,
  },

  data() {
    return {
      unit: "",
      unitDisabled: false,
      unitpriceDisabled: false,
      unitprice: "",
      quantity: "",
      quantityDisabled: false,
    };
  },

  computed: {
    allFieldsFilled() {
      return (
        this.barcodeData &&
        this.productnameData &&
        this.categoryData &&
        this.subCategoryData &&
        this.brandData &&
        this.supplierData &&
        this.unit &&
        this.quantity &&
        this.unitprice
      );
    },
  },

  watch: {
    unit(value) {
      if (value) this.getBarcode(value);
    },
    successCheckoutProps() {
      this.unit = "";
      this.unitDisabled = false;
      this.quantityDisabled = false;
      this.unitpriceDisabled = false;
      this.unitprice = "";
      this.quantity = "";
    },
  },

  created() {
    this.toast = useToast();
  },

  methods: {
    ...mapActions("inventory", ["getListBarcode"]),
    async getBarcode(value) {
      try {
        this.unitDisabled = !this.unitDisabled;
        let result = await this.getListBarcode({ barcode: this.barcodeData });

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
      } catch (error) {
        this.toast.error("Barkod bulunamadı!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
  },
};
</script>